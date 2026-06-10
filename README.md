# 🟣 Violet Lab - Multi-Environment Deployment

Laboratórios isolados com deploy multi-ambiente via GitHub (GitOps).

## 🚀 Deploy Rápido

1. Configure os labs no dashboard Violet
2. Clique em **_EXPORT CONFIG** → baixa o JSON
3. Suba o JSON no GitHub
4. Em outro servidor, clique em **_DEPLOY FROM GITHUB**
5. Cole a URL Raw → todos os labs carregam automaticamente

## 📦 Estrutura do Config

json
{
  "version": "2.0",
  "exportedAt": "2026-06-10T00:00:00Z",
  "environment": "production",
  "client": "Empresa XYZ",
  "labs": [
    {
      "name": "KALI-PROD-01",
      "os": "kali",
      "status": "online",
      "ip": "10.10.20.15",
      "image": "kalilinux/kali-rolling:latest",
      "network": "isolated",
      "purpose": "pentest"
    }
  ],
  "networkPolicy": {
    "defaultMode": "isolated",
    "allowedEgress": ["blue.rapsodia.com:5073"],
    "dnsServers": ["8.8.8.8"]
  },
  "snapshots": {
    "autoSnapshot": true,
    "schedule": "0 */12 * * *",
    "retention": 7
  },
  "history": []
}
---
🌍 Ambientes
Ambiente	Arquivo	URL Raw
Desenvolvimento	dev.json	github.com/.../dev.json
Staging	staging.json	github.com/.../staging.json
Produção	production.json	github.com/.../production.json
Cliente XYZ	cliente-xyz.json	github.com/.../cliente-xyz.json
🎯 Funcionalidades
Multiplicador de instâncias: +1, +2, +4 nós com um clique

Toggle Start/Stop: Liga e desliga labs individualmente

Snapshots: Individuais ou em lote

Histórico: Rastreamento completo de ações (localStorage)

Export/Import: JSON portável entre ambientes

Deploy GitOps: URL do GitHub Raw carrega configuração remota

Multi-tenant: Cada cliente com seu próprio arquivo de config

🔄 Fluxo GitOps
text
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  VIOLET DEV  │     │    GITHUB    │     │  VIOLET PROD │
│              │     │              │     │              │
│ Config labs  │────▶│  push JSON   │────▶│  pull JSON   │
│ Export JSON  │     │  versionado  │     │  Deploy auto │
└──────────────┘     └──────────────┘     └──────────────┘
🖥️ Sistemas Operacionais
OS	Imagem Docker
Kali Linux	kalilinux/kali-rolling:latest
Ubuntu 22.04	ubuntu:22.04
Debian 12	debian:12
Windows Server	mcr.microsoft.com/windows/servercore:ltsc2022
Metasploitable	tleemcphilamy/metasploitable2:latest
🔒 Rede
Modo	Descrição
isolated	Isolamento total (VLAN)
bridge	Layer 2 Bridge
nat	NAT Gateway compartilhado
📊 Histórico
Toda ação é registrada com timestamp:

DEPLOYED - Nova instância criada

START/STOP - Toggle de estado

SNAPSHOT - Snapshot salvo

MODIFIED - Configuração alterada

DESTROYED - Instância removida

PURGED - Limpeza total

🎨 Design
Fonte: JetBrains Mono

Cor principal: #8f70f2 (Violet)

Background: #0d1117

Cards: #161b22 
