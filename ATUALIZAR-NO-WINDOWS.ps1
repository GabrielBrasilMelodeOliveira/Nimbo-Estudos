# Execute na pasta concurso-ti, usando o mesmo projeto Docker da versão anterior.
Write-Host 'Nimbo 5.14.0 - contas individuais e coruja' -ForegroundColor Green
if (-not (Test-Path '.\docker-compose.yml')) { throw 'Abra este script dentro da pasta concurso-ti.' }
Write-Host 'Faça backup ANTES de executar: docker compose exec db sh -c "pg_dump -U concurso -d concurso_ti -Fc -f /tmp/nimbo-backup.dump"'
Write-Host 'Depois: docker compose cp db:/tmp/nimbo-backup.dump ./nimbo-backup-antes-5.14.dump'
Write-Host 'Nao rode docker compose down -v!'
git pull --ff-only origin main
if ($LASTEXITCODE -ne 0) { throw 'Falha ao atualizar o codigo. Resolva as alteracoes locais ou a conexao e tente novamente.' }
docker compose up -d --build
if ($LASTEXITCODE -ne 0) { throw 'Falha ao criar os containers. Confira os logs acima.' }
docker compose ps
Write-Host 'Abra http://localhost:3000 e confira Nimbo v5.14.0 no menu lateral' -ForegroundColor Green
Write-Host 'No primeiro cadastro, copie NIMBO_SETUP_KEY dos logs: docker compose logs api' -ForegroundColor Cyan
Write-Host 'A primeira conta recebe os dados existentes. As demais comecam com seus proprios dados.'
