#!/bin/sh

# ─── Mount CIFS share if configured ──────────────────────────────────
if [ -n "$GAMESERVER_CIFS_SHARE" ] && [ -n "$GAMESERVER_CIFS_PASSWORD" ]; then
  MOUNT_POINT="${GAMESERVER_CIFS_MOUNT:-/mnt/gameserver}"
  CIFS_USER="${GAMESERVER_CIFS_USER:-guest}"
  CIFS_DOMAIN="${GAMESERVER_CIFS_DOMAIN:-WORKGROUP}"

  echo "[Entrypoint] Montando CIFS share: $GAMESERVER_CIFS_SHARE -> $MOUNT_POINT"

  mount -t cifs "$GAMESERVER_CIFS_SHARE" "$MOUNT_POINT" \
    -o "username=$CIFS_USER,password=$GAMESERVER_CIFS_PASSWORD,domain=$CIFS_DOMAIN,iocharset=utf8,file_mode=0777,dir_mode=0777,vers=3.0,noperm" 2>&1

  if [ $? -eq 0 ]; then
    echo "[Entrypoint] CIFS montado correctamente en $MOUNT_POINT"
    ls "$MOUNT_POINT" | head -10
  else
    echo "[Entrypoint] WARNING: No se pudo montar CIFS share."
  fi
else
  echo "[Entrypoint] CIFS no configurado (falta GAMESERVER_CIFS_SHARE o GAMESERVER_CIFS_PASSWORD)"
fi

# ─── Start Node.js app ───────────────────────────────────────────────
exec node app.js
