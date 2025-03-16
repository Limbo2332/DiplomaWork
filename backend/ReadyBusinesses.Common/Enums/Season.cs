using Newtonsoft.Json;

namespace ReadyBusinesses.Common.Enums;

[JsonConverter(typeof(SeasonJsonConverter))]
public enum Season
{
    Summer,
    Autumn,
    Winter,
    Spring,
}

public class SeasonJsonConverter : JsonConverter<Season>
{
    private readonly Dictionary<Season, string> _seasonDescriptions = new()
    {
        { Season.Summer, "Літо" },
        { Season.Autumn, "Осінь" },
        { Season.Winter, "Зима" },
        { Season.Spring, "Весна" }
    };

    public override void WriteJson(JsonWriter writer, Season value, JsonSerializer serializer)
    {
        writer.WriteValue(_seasonDescriptions[value]);
    }

    public override Season ReadJson(JsonReader reader, Type objectType, Season existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        string value = reader.Value.ToString();
        foreach (var pair in _seasonDescriptions)
        {
            if (pair.Value == value)
            {
                return pair.Key;
            }
        }
        throw new JsonSerializationException($"Unknown Season value: {value}");
    }
}