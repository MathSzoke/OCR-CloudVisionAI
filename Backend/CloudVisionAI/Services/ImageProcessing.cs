namespace Services;

public class ImageProcessing : IImageProcessing
{
    public async Task<string> ProcessFileAsync(Stream fileStream, string fileName)
    {
        var backendDirectory = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory())!.FullName, "CloudVisionAI");
        var credentialsPath = Path.Combine(backendDirectory, "theta-now-424113-u3-c8c30865dbda.json");
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialsPath);

        if (Path.GetExtension(fileName).Equals(".pdf", StringComparison.OrdinalIgnoreCase))
        {
            using var pdfDocument = PdfDocument.Load(fileStream);
            var report = string.Empty;
            for (int i = 0; i < pdfDocument.PageCount; i++)
            {
                using var image = pdfDocument.Render(i, 300, 300, true);
                using var imageStream = new MemoryStream();
                image.Save(imageStream, ImageFormat.Png);
                imageStream.Seek(0, SeekOrigin.Begin);

                report += await ProcessImageAsync(imageStream);
            }
            return report;
        }
        else
        {
            return await ProcessImageAsync(fileStream);
        }
    }

    private static async Task<string> ProcessImageAsync(Stream imageStream)
    {
        var client = ImageAnnotatorClient.Create();
        var gcpImage = Image.FromStream(imageStream);
        var response = await client.DetectTextAsync(gcpImage);

        string? firstText = null;
        var report = string.Empty;

        // Deste jeito printa no console somente a primeira vez que o texto é lido na API.
        foreach (var annotation in response)
        {
            if (annotation.Description != null && report == "")
            {
                report += annotation.Description;
            }
        }

        //foreach (var annotation in response)
        //{
        //    if (annotation.Description != null)
        //    {
        //        _ = string.IsNullOrEmpty(firstText) ? firstText = annotation.Description : report += annotation.Description + " ";
        //    }
        //}

        return report.Trim();
    }
}
