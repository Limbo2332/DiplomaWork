using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.Helpers;

public static class CurrencyConvertation
{
    private const decimal USD_TO_UAH = 41.64M;
    private const decimal EURO_TO_UAH = 43.57M;
    private const decimal EURO_TO_USD = 1.05M;

    public static decimal UsdToUah(decimal amount)
    {
        return amount * USD_TO_UAH;
    }

    public static decimal EuroToUsd(decimal amount)
    {
        return amount * EURO_TO_UAH;
    }

    public static decimal ToUah(Currency currency, decimal amount)
    {
        return currency switch
        {
            Currency.USD => UsdToUah(amount),
            Currency.EURO => EuroToUsd(amount),
            Currency.UAH => amount,
            _ => amount
        };
    }

    public static decimal To(Currency fromCurrency, Currency toCurrency, decimal amount)
    {
        if (fromCurrency == toCurrency)
        {
            return amount;
        }

        var amountInUah = ToUah(fromCurrency, amount);

        return toCurrency switch
        {
            Currency.USD => amountInUah / USD_TO_UAH,
            Currency.EURO => amountInUah / EURO_TO_UAH,
            Currency.UAH => amountInUah,
            _ => amountInUah
        };
    }
}