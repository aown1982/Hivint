using Hivint.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hivint.Services
{
    public interface IDomainService
    {
      IEnumerable<Subdomain>  GetSubDomains(string url, int page, int pageSize);
      IEnumerable<Subdomain> GetSubdomainsIpAddresses(string url);


    }
}
