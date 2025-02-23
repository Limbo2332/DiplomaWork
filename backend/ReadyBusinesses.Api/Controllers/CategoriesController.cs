using Microsoft.AspNetCore.Mvc;

namespace ReadyBusinesses.Api.Controllers;

[Route("[controller]")]
[ApiController]
public class CategoriesController : Controller
{
    [HttpGet]
    public ActionResult<IEnumerable<string>> GetCategories()
    {
        return new List<string>
        {
            "Автомобільний бізнес",
            "Агробізнес",
            "Орендний бізнес",
            "Вендинговий бізнес",
            "Видобуток ресурсів",
            "Зообізнес",
            "Видавний бізнес та ЗМІ",
            "Краса та здоров'я",
            "Медицина",
            "Громадське харчування",
            "Виробництво",
            "Розваги і дозвілля",
            "Будівництво",
            "Сфера послуг",
            "Торгівля",
            "Фінансовий бізнес"
        };
    }
}