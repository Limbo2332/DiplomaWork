namespace ReadyBusinesses.Common.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException() : base("Entity was not found") { }

        public NotFoundException(string entityName) : base($"{entityName} was not found") { }

        public NotFoundException(string entityName, int id) : base($"{entityName} with id {id} was not found") { }
    }
}
