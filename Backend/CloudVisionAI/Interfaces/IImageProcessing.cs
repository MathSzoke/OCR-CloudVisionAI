namespace Interfaces;

public interface IImageProcessing
{
    Task<string> ProcessFileAsync(Stream fileStream, string fileName);
}
