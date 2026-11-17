# Execute na pasta concurso-ti, usando o mesmo projeto Docker da versão anterior.
Write-Host 'Nimbo 5.5 - revisões inteligentes e agenda integrada' -ForegroundColor Green
if (-not (Test-Path '.\docker-compose.yml')) { throw 'Abra este script dentro da pasta concurso-ti.' }
Write-Host 'Faça backup ANTES de executar: docker compose exec db sh -c "pg_dump -U concurso -d concurso_ti -Fc -f /tmp/nimbo-backup.dump"'
Write-Host 'Depois: docker compose cp db:/tmp/nimbo-backup.dump ./nimbo-backup-antes-5.5.dump'
Write-Host 'Nao rode docker compose down -v!'
docker compose up -d --build
if ($LASTEXITCODE -ne 0) { throw 'Falha ao criar os containers. Confira os logs acima.' }
docker compose ps
Write-Host 'Abra http://localhost:3000' -ForegroundColor Green
