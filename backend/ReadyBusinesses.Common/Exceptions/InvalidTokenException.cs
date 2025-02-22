namespace ReadyBusinesses.Common.Exceptions
{
    public class InvalidTokenException : Exception
    {
        public InvalidTokenException(string tokenName) : base($"Invalid {tokenName}.") { }
    }
}
