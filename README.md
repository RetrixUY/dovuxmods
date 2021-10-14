# dovux-mods

BOT Para la comunidad de discord de Dovux

## Uso
1. Clonar el repositorio
	 `` git clone https://github.com/RetrixUY/dovuxmods.git ``
2.	Crear aplicacion en [Discord Developer Portal](https://discord.com/developers/applications/)
3.	Meter el bot al ds con los scopes: ``bot y applications.commands``
4.	LLENAR EL .env: 
	``DISCORD_TOKEN=...`` token del bot
	``PERMS=...`` permisos de los roles creados, por defecto colocar (107478371904)
	``AUTO_ROLES_CHANNEL=...`` canal donde se colocan los auto-roles
	``ADMIN_ROLE=...`` rol necesario para usar el comando /add-role