using System.Diagnostics;

Process[] localProcess = Process.GetProcesses();
List<Proc> listProcesses = new List<Proc>();

for (int i = 0; i < localProcess.Length-1; i++)
{
    listProcesses.Add(new() { Id = localProcess[i].Id.ToString(), processName =  localProcess[i].ProcessName, basePriority =  localProcess[i].BasePriority });
}

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/proc", () => listProcesses);

app.MapDelete("/api/proc/{id}", (string id) =>
{
    Proc? proc = listProcesses.FirstOrDefault(p => p.Id == id);
    if (proc == null) return Results.NotFound(new { message = "Process not found" });
    listProcesses.Remove(proc);
    return Results.Json(proc);
});

app.Run();


public class Proc
{
    public string Id { get; set; } = "";
    public string processName { get; set; } = "";
    public int basePriority { get; set; }
}
