using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Activator.Dto;
using Serilog;

namespace Activator.Controllers
{
    [Route("api/[controller]")]
    public class ActivatorController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly ILogger log;

        public ActivatorController(IConfiguration _configuration, ILogger _log)
        {
            this.configuration = _configuration;
            this.log = _log;
        }

        [HttpGet("[action]")]
        public IActionResult Index()
        {
            return View();
            //return View("Validate");
        }

        [HttpGet("[action]/{code}")]
        public async Task<IActionResult> validate(Guid code)
        {
            log.Debug($"validating Code: {code}");

            var Url = configuration.GetValue<string>("OpenServiceUrl");
            var response = new ValidationResponse();

            using (var webClient = new HttpClient())
            {                
                var result = await webClient.GetAsync(Url + "/?code=" + code);

                if (result.IsSuccessStatusCode)
                {
                    response = new ValidationResponse
                    {
                        Success = true,
                        Message = "Validazione effettuata con successo"
                    };
                }
                else {
                    response = new ValidationResponse
                    {
                        Success = false,
                        Message = "Codice non corretto"
                    };
                }

                log.Debug($"validating result: {response.Success} - Message: {response.Message}");
                return View(response);
            }            
        }


        [HttpGet("[action]/{code}")]
        public JsonResult DummyActivation(string code)
        {
            return new JsonResult("OK funzion. Code: " + code);
        }


        [Route("/Error")]
        public ViewResult Error()
        {
            return View();
        }
    }
}
