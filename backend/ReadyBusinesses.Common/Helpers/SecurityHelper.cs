using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace ReadyBusinesses.Common.Helpers
{
    public static class SecurityHelper
    {
        public static string HashPassword(string password, byte[] salt) =>
            Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8)
                );

        public static byte[] GetRandomBytes(int length = 32)
        {
            using var randomNumberGenerator = RandomNumberGenerator.Create();

            var salt = new byte[length];
            randomNumberGenerator.GetBytes(salt);

            return salt;
        }

        public static byte[] GetSeedingBytes(int length = 32)
        {
            var r = new Random(0);
            var salt = new byte[length];

            for (var i = 0; i < salt.Length; i++)
                salt[i] = (byte)r.Next(1, 256);

            r.NextBytes(salt);

            return salt;
        }

        public static bool ValidatePassword(string password, string hash, string salt)
        {
            return HashPassword(password, Convert.FromBase64String(salt)) == hash;
        }
    }
}
