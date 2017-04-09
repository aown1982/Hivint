using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Hivint.Helpers;
using Hivint.Models.Entities;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {


        int page = 1;
        int pageSize = 20;

        [HttpGet("enumerate/{url}", Name = "GetSubDomains")]
        public IActionResult GetSubDomains(string url)
        {
            var pagination = Request.Headers["Pagination"];

            if (!string.IsNullOrEmpty(pagination))
            {
                string[] vals = pagination.ToString().Split(',');
                int.TryParse(vals[0], out page);
                int.TryParse(vals[1], out pageSize);
            }

            int currentPage = page;
            int currentPageSize = pageSize;

            var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
            var permutations = alphabet.Select(x => x.ToString());

            var index = 0;
            var subdomains = permutations.Concat(permutations.SelectMany(x => alphabet, (x, y) => x + y)).Select(r => new Subdomain
            {
                SubdomainName = string.Concat(r, '.' + DomainHelper.GetDomainFromUrl(new UriBuilder(url).Uri)),
                Id = ++index
            }).ToList();

            
            var totalDomains = subdomains.Count();
            var totalPages = (int)Math.Ceiling((double)totalDomains / pageSize);

            IEnumerable<Subdomain> _subdomains = subdomains
                .OrderBy(x => x.Id)
                .Skip((currentPage - 1) * currentPageSize)
                .Take(currentPageSize)
                .ToList();

            Response.AddPagination(page, pageSize, totalDomains, totalPages);

            return new OkObjectResult(_subdomains);
        }


        [HttpPost("findIPAddresses", Name = "GetSubdomainsIpAddresses")]
        public async Task<IActionResult> GetSubdomainsIpAddresses([FromBody] List<Subdomain> subdomains)
        {

            foreach (var item in subdomains)
            {
                try
                {
                    var IP = await System.Net.Dns.GetHostAddressesAsync(item.SubdomainName);

                    if (IP != null)
                        item.IpAddresses = string.Join(",", IP.Select(ip => ip.ToString()).ToArray());
                }
                catch (Exception ex)
                {

                }

            }

            return new OkObjectResult(subdomains);
        }

    }
}
