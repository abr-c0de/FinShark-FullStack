using Api.Dtos.Stock;
using Api.Interface;
using Api.Mappers;
using Api.Model;
using Newtonsoft.Json;

namespace Api.Service
{
    public class FMPService(HttpClient httpClient, IConfiguration config) : IFMPService
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly IConfiguration _config = config;

        public async Task<StockDto> FindStockBySymbolAsync(string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
                throw new ArgumentException("Symbol cannot be null or empty", nameof(symbol));

            var apiKey = _config["FMPKey"];
            if (string.IsNullOrWhiteSpace(apiKey))
                throw new InvalidOperationException("FMP API key is missing in configuration");

            var url = $"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={apiKey}";

            HttpResponseMessage response;
            try
            {
                response = await _httpClient.GetAsync(url);
            }
            catch (HttpRequestException ex)
            {
                throw new HttpRequestException("Error while calling Financial Modeling Prep API", ex);
            }

            if (!response.IsSuccessStatusCode)
            {
                throw new ApplicationException(
                    $"FMP API failed with status code {(int)response.StatusCode}");
            }

            var content = await response.Content.ReadAsStringAsync();

            var stocks = JsonConvert.DeserializeObject<FMPStocks[]>(content)
                         ?? throw new ApplicationException("Invalid response from FMP API");

            var stock = stocks.FirstOrDefault()
                        ?? throw new KeyNotFoundException($"Stock with symbol '{symbol}' not found");

            return stock.FMPStockToStockDto();
        }
    }
}