using System;
using System.Collections.Generic;

namespace Hivint.Models.Entities
{
    public class Subdomain : IEntityBase
    {
        public Subdomain()
        {
        }
        public int Id { get ; set ; }

        public string SubdomainName { get; set; }

        public string IpAddresses { get; set; }
    }
}