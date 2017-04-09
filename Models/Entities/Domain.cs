using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hivint.Models.Entities
{
    public class Domain : IEntityBase
    {
        public int Id { get ; set ; }
        public string DomainName { get; set; }
        public ICollection<Subdomain> Subdomains { get; set; }
    }
}
