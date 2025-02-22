namespace ReadyBusinesses.Common.Exceptions
{
    public class InvalidEmailUsernameOrPasswordException : Exception
    {
        public InvalidEmailUsernameOrPasswordException() : base("Invalid username/email or password") { }
    }
}
