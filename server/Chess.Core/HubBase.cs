using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Chess.Core;

public class HubBase : Hub
{
    private readonly ILogger<HubBase> _logger;

    public HubBase(ILogger<HubBase> logger)
    {
        _logger = logger;
    }

    protected string GetConnectionId() => Context.ConnectionId;

    public override async Task OnConnectedAsync()
    {   
        await Clients.All.SendAsync("onConnected", $"{GetConnectionId()}");
        _logger.LogInformation("Client with Id:'{clientId}' connected", GetConnectionId());
        await base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        _logger.LogInformation("Client wit Id: '{clientId}' disconnected'", GetConnectionId());
        return base.OnDisconnectedAsync(exception);
    }
}