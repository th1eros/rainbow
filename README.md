# aBitat Command Center

**Red Team | Blue Team | Violet Lab | Silver AI**

Plataforma unificada de operacoes de ciberseguranca com 4 modulos integrados via HTMX e .NET 8.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTMX 1.9 + JavaScript (Vanilla) |
| Estilo | CSS3 com Design System proprio (variaveis CSS) |
| Backend | .NET 8 (4 microservicos) |
| Cache | Redis (StackExchange.Redis) |
| Mensageria | Orleans (Microsoft Orleans) |
| Banco | Oracle / InMemory (EF Core) |
| Autenticacao | JWT + 2FA via Email |
| Infra | Docker Swarm / Nginx |

---

## Modulos

| Modulo | Porta | Cor | Funcao |
|--------|-------|-----|--------|
| **Blue Shield** | 5073 | Azul (`#6ba4d6`) | Defesa, SIEM, Assets, Vulns, Incidentes |
| **Red Exploit** | 5074 | Vermelho (`#d97a7a`) | Pentest, Scans, Exploits, Payloads |
| **Violet Lab** | 5075 | Purpura (`#a89dd4`) | Laboratorios isolados, Sandbox, Honeypot |
| **Silver Bullet** | 5076 | Cinza (`#b8bdc4`) | Orquestracao IA, Workflows, Obsidian |

---

## Arquitetura
┌──────────────────────────────────────────────┐
│ Nginx (Porta 80/443) │
│ Frontend Estatico (HTMX + CSS) │
└────────────┬──────┬──────┬──────┬────────────┘
│ │ │ │
5073 5074 5075 5076
│ │ │ │
┌────┴──────┴──────┴──────┴────┐
│ Docker Swarm │
│ Blue │ Red │ Violet │ Silver │
└──────────────────────────────┘

---

## Instalacao

### Pre-requisitos

- .NET 8 SDK
- Node.js 18+ (apenas para http-server local)
- Redis (opcional, para cache)
- Oracle Database (opcional, fallback InMemory)

### Backend

```bash
cd backend
dotnet restore
dotnet run --project Rapsodia.Blue
dotnet run --project Rapsodia.Red
dotnet run --project Rapsodia.Violet
dotnet run --project Rapsodia.Silver

Funcionalidades
Blue Shield
Dashboard com grid expansivel (duplo clique)

CRUD de Assets, Vulnerabilidades, Incidentes

Grafo de topologia com redimensionamento

Integracoes e Health Check

Red Exploit
Multi-target com persistencia localStorage

14 ferramentas (Nmap, Metasploit, Impacket, etc.)

Modal com configuracao de ferramenta e target preenchido

Playbooks de scan → exploit

Violet Lab
Provisionamento de labs isolados (Kali, Windows, Ubuntu)

Snapshot e export/import de configuracao

Deploy via GitHub (JSON remoto)

Honeypot e Cyber Range

Silver AI
Orquestracao multi-agente (Blue, Red, Violet, Silver)

Workflows: Scan, Pentest, Full, AI Analysis

Obsidian Knowledge Vault com busca e CRUD

Console de chat com IA

Status do Projeto
https://img.shields.io/badge/status-HML-yellow
https://img.shields.io/badge/.NET-8.0-blue
https://img.shields.io/badge/HTMX-1.9.12-green