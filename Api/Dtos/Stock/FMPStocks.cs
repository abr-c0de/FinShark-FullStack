
namespace Api.Dtos.Stock
{
    public class FMPStocks
{
    public string symbol { get; set; } = null!;

    // money / prices
    public decimal price { get; set; }
    public decimal change { get; set; }
    public decimal changePercentage { get; set; }
    public decimal lastDividend { get; set; }

    // market metrics
    public decimal marketCap { get; set; }
    public decimal volume { get; set; }
    public decimal averageVolume { get; set; }
    public decimal beta { get; set; }

    // info
    public string companyName { get; set; } = null!;
    public string? range { get; set; }
    public string? currency { get; set; }
    public string? cik { get; set; }
    public string? isin { get; set; }
    public string? cusip { get; set; }

    // exchange
    public string? exchangeFullName { get; set; }
    public string? exchange { get; set; }

    // classification
    public string industry { get; set; } = null!;
    public string? sector { get; set; }
    public string? country { get; set; }

    // company details
    public string? website { get; set; }
    public string? description { get; set; }
    public string? ceo { get; set; }
    public string? fullTimeEmployees { get; set; }

    // contact
    public string? phone { get; set; }
    public string? address { get; set; }
    public string? city { get; set; }
    public string? state { get; set; }
    public string? zip { get; set; }

    // misc
    public string? image { get; set; }
    public string? ipoDate { get; set; }

    public bool defaultImage { get; set; }
    public bool isEtf { get; set; }
    public bool isActivelyTrading { get; set; }
    public bool isAdr { get; set; }
    public bool isFund { get; set; }
}
}