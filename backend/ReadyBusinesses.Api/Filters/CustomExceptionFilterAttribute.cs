﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ReadyBusinesses.Common.Extensions;

namespace ReadyBusinesses.Common.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var (httpStatusCode, errorStatusCode) = context.Exception.ParseException();

            context.HttpContext.Response.ContentType = "application/json";
            context.HttpContext.Response.StatusCode = (int)httpStatusCode;
            context.Result = new JsonResult(new
            {
                error = context.Exception.Message,
                code = errorStatusCode
            });
        }
    }
}
