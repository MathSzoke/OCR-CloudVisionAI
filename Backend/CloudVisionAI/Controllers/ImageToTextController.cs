namespace Controllers;

[ApiController]
[Route("[controller]")]
public class ImageToTextController(IImageProcessing imageProcessing) : ControllerBase
{
    private readonly IImageProcessing _imageProcessing = imageProcessing;

    [HttpPost(nameof(Convert))]
    public async Task<IActionResult> Convert([FromForm] FileUpload fu)
    {
        if (fu == null || fu.File.Length == 0)
            return BadRequest("Por favor, insira um arquivo PDF ou imagem.");

        try
        {
            using var memoryStream = new MemoryStream();
            await fu.File.CopyToAsync(memoryStream);
            memoryStream.Seek(0, SeekOrigin.Begin);

            var result = await this._imageProcessing.ProcessFileAsync(memoryStream, fu.File.FileName);
            return Ok(result);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
