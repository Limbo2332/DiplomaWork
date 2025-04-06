using System.Text.Json;
using ChatGptNet;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using ReadyBusinesses.AI;
using ReadyBusinesses.AI.Extensions;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Topsis;

namespace ReadyBusinessesAi;

public class UnitTest1
{
    [Fact]
    public async Task Ai_TEst()
    {
        // Arrange
        var postString =
            "{\n    \"Id\": \"5E60138B-44EC-48D1-84A0-C321D6AF2513\",\n    \"PriceInUah\": 135330000,\n    \"Location\": \"Бар\",\n    \"RoomArea\": 800000,\n    \"RoomRent\": null,\n    \"AverageChequePrice\": 600000,\n    \"AverageRevenuePerMonth\": 5000000,\n    \"AverageProfitPerMonth\": 2000000,\n    \"Name\": \"Гранітний кар'єр подвійного призначення\",\n    \"HasPhop\": 1,\n    \"HasGeneratorOrEcoFlow\": 1,\n    \"HasBargaining\": 0,\n    \"HasSupportFromPreviousOwner\": 1,\n    \"HasShelter\": 0,\n    \"IsSeasonal\": 0,\n    \"Description\": \"<p>Площа родовища&nbsp;– 54,9 га. Площа території, що орендується - 88,09 га (7 ділянок). Гірничий&nbsp;відвід&nbsp;ділянки з видобутку блочного каменю – 15,92 га, з видобутку каменю на щебінь – 33,28 га.&nbsp;Договори оренди&nbsp;землі&nbsp;до 2036 року.</p><p>Спеціальний дозвіл на видобування&nbsp;до&nbsp;2036 року. Дозвіл містить дві окремі ділянки: з видобутку блочного каменю (Сardinal Grey&nbsp;GG4) та бутового каменю для виробництва щебеню.</p><p>Балансові запаси на 2024 р. становлять 15,762 млн. м3, з них:&nbsp;під блоки (кат. А + Б) - 3,176 млн м3, під щебінь (кат. А + Б + С1) -12,586 млн м3.</p><p>Також за категорією С1 умовно балансові запаси по блочній ділянці +2,69 млн м3, по ділянці щебеню +1,074 млн м3.&nbsp;Додатково можливий приріст запасів по підошві кар’єру. Початкові запаси відпрацьовані лише на \u2248 24% від 1975 року.</p><p>Характеристики&nbsp;щебеневої&nbsp;продукції:&nbsp;номенклатури фракцій за сертифікатами: 0-5, 5-10, 10-20, 5-20, 20-40, 40-70, суміші С-11, С-7, С-5. Марка на стиск М1200, щільність 2,7 т/м.куб, клас радіоактивності перший, марка стирання Ст.1, марка по опору удару У-75,&nbsp;сер.&nbsp;ліщадність г/п = 15%. Діюча лабораторія із обладнанням.</p><p>Характеристика блочної&nbsp;сировини:&nbsp;Жежелівський граніт має переважно темно-сірий колір, середню зернистість та покритий вкрапленнями гранатового кольору. Граніт має&nbsp;марку М1200 – М1400, клас радіоактивності - перший, добре піддається поліруванню і легкий в обробці.&nbsp;Мінеральний склад: КПШ – 20%, Плагіоклаз – 30-35%, Кварц – 23%, Біотит – 15-25%, інші – 2-7%. Основною продукцією кар'єру є гранітні блоки об'ємом до 4 м3. Крім блоків є можливість випуску гранітних слябів для подальшої обробки.</p><p>Чисельність персоналу:&nbsp;24&nbsp;особи&nbsp;(ІТР&nbsp;-8&nbsp;осіб,&nbsp;інший&nbsp;персонал&nbsp;-16&nbsp;осіб).&nbsp;&nbsp;Поточна робота&nbsp;в&nbsp;1 зміну.</p><p>Номінальна річна продуктивність&nbsp;лінії випуску щебеню = 1 100 000 т/рік</p><p>Фактична погодинна потужність переробки =&nbsp;280-340 т./годину (в залежності від режиму роботи)</p><p>4 стадії дроблення:</p><ol><li>Приймальний бункер (60 м.куб) з пластинчастим живильником та щокова дробарка СМД-111;</li><li>Конусна дробарка середнього дроблення Metso GP300s + Гуркіт CVB 2060 (3 деки);</li><li>Мобільний комплекс з конусною дробаркою Sandvik СH-440 + Гуркіт (2 деки) + Гуркіт (3 деки);</li><li>Незалежна лінія з конусною дробаркою Metso HP-100 + Гуркіт (3 деки).</li></ol><p>Проведено істотну модернізацію виробництва влітку 2024 року, дробильно-сортувальний комплекс&nbsp;автоматизовано на базі ПЗ&nbsp;Skada&nbsp;з центральним пультом керування, кожен елемент заводу має відповідну індикацію, захист, та вимірювальні прилади для уникнення впливу людського фактору, лінія повністю&nbsp;забезпечена технікою: два навантажувачі (САТ, VOLVO), екскаватор (Liebherr), два БелАЗи (45&nbsp;т), два БелАЗи (30&nbsp;т), КрАЗ, три крани (два автокрани КС і РДК) ), Бензовоз тощо. Також є ємність з ліцензією 10 м.куб і гараж з ремонтними боксами,&nbsp;два&nbsp;легкові автомобілі Skoda.</p><p>На території кар'єру крім дробильно-сортувальної лінії, розташований комплекс цехів з розпилювання та полірування плит з блочного кар'єру, всі приміщення укомплектовані кран-балками, мостовими кранами та тельферами.</p><p>Також на території розташовані&nbsp;будівлі:&nbsp;операторська, побутова, адмін-корпус, прохідна, склад, токарний цех, компресорна, насосна, гараж. Площа всіх будов понад 4000 м.кв.</p><p>Є&nbsp;вузол&nbsp;залізничного навантаження, укомплектована рампою з двома приймальними бункерами, і конвеєрною системою завантаження на 10-20 вагонів приймання.</p><h3><em>Більш детальна інформація надається за запитом</em></h3>\",\n    \"HasIntegrationWithDeliveryServices\": 1,\n    \"CreatedBy\": \"9AF50195-6F6D-4CD8-A5D7-08DD5FCA380B\",\n    \"CreatedAt\": \"2025-04-05 18:03:41.5414936\",\n    \"UpdatedAt\": \"2025-04-05 18:03:40.7914433\",\n    \"Category\": \"Видобуток ресурсів\",\n    \"Currency\": 1,\n    \"HasEquipment\": 1,\n    \"Season\": null,\n    \"BusinessStatus\": 0,\n    \"EmployersCount\": 24,\n    \"EmployersSalaryPerMonth\": 500000,\n    \"HasCompetitors\": 0,\n    \"InvestmentScore\": 0\n  }";
            
        var post = JsonConvert.DeserializeObject<Post>(postString);

        var services = new ServiceCollection();
        
        services.AddChatGpt();
        
        var serviceProvider = services.BuildServiceProvider();
        var client = serviceProvider.GetService<IAiClient>();
        
        // Act
        var response = await client.AskRecommendationAsync(post);
        
        // Assert
        Assert.NotNull(response);
    }

    [Fact]
    public void Test()
    {
        var solver = new Solver();

        var criteriaMatrix = new List<decimal[]>
        {
            new decimal[] { 36M, 80M, 86M, 24M },
            new decimal[] { 100M, 20M, 19M, 30M },
            new decimal[] { 56M, 100M, 40M, 80M }
        };

        var weights = new decimal[]
        {
            0.11M, 0.24M, 0.45M, 0.2M
        };

        var normalized = solver.NormalizeCriteriaMatrix(criteriaMatrix);
        var weightedNormalized = solver.CalculateWeightedNormalizedCriteriaMatrix(normalized, weights);
        var (pis, nis) = solver.CalculatePisAndNis(weightedNormalized);

        var distancesToPis = solver.CalculateDistancesToPis(weightedNormalized, pis);
        var distancesToNis = solver.CalculateDistancesToPis(weightedNormalized, nis);

        var closenessToPis = solver.CalculateClosenessToPis(distancesToPis, distancesToNis);
    }
}