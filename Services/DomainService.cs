using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hivint.Models.Entities;
using Microsoft.AspNetCore.Http;
using Hivint.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Hivint.Services
{
    public class DomainService : IDomainService
    {
        
        public IEnumerable<Subdomain> GetSubDomains(string url, int page, int pageSize  )
        {
            return null;
        }

        public IEnumerable<Subdomain> GetSubdomainsIpAddresses(string url)
        {
            return null;
        }
    }
}
