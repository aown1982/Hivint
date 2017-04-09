using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Hivint.Helpers
{
    public static class DomainHelper
    {

      public static string GetDomainFromUrl(Uri uri)
        {
            return Regex.Match(uri.Host, @"\w+(\.(com|org|edu))?$", RegexOptions.IgnoreCase).Value;
        }
    }
}
