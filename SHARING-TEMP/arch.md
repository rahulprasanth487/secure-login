# Architecture Overview

This architecture implements a federated, behavior-conditioned secure login and transaction system. Below is a detailed description of each component and the data flow, followed by the Mermaid diagram.

---

## Component Descriptions

**Central_Server (Central Federated LLM Controller):**
- **Trust Scoring Engine (TS):** Evaluates the trustworthiness of client updates.
- **TW-FedAvg Aggregator (TW):** Aggregates LoRA and PCAL deltas from clients using federated averaging.
- **Update Validator (UV):** Validates incoming model updates for integrity and compliance.
- **PCAL Aggregator (PA):** Aggregates Prompt-Class Anchoring Layer updates.
- **Audit Trail Manager (AR):** Maintains a Merkle root store for auditability and rollback.

**Client_A / Client_B:**
- **Base LLM (BA1/BA2):** The foundational language model on each client.
- **Behavior-Conditioned LoRA Adapter (LA1/LA2):** Personalizes the LLM based on user behavioral signatures.
- **Behavioral Signature Module (BS1/BS2):** Captures and encodes user-specific behavioral biometrics (e.g., typing rhythm, facial hash).
- **Prompt-Class Anchoring Layer (PCAL1/PCAL2):** Anchors prompt classes for robust adaptation.
- **Local Audit Branch (AU1/AU2):** Maintains a local Merkle branch for transaction integrity.

**Data Flow:**
- Clients send LoRA & PCAL deltas (solid arrows) to the central server for aggregation.
- Clients also send hashes & trust metrics (dashed arrows) for validation.
- The central server distributes global LoRA & PCAL updates back to clients.
- Rollback/quarantine (red arrow) is triggered if a client’s update is invalid or malicious.

**User Interaction:**
- Users interact with the client, submitting prompts and receiving outputs.

---

## Flowchart

```mermaid
flowchart TD
    %% ==================== CENTRAL SERVER ====================
    subgraph Central_Server["Central Federated LLM Controller"]
        TS[Trust Scoring Engine]
        TW[TW-FedAvg Aggregator]
        UV[Update Validator]
        PA[PCAL Aggregator]
        AR[Audit Trail Manager Merkle Root Store]
    end

    %% ==================== CLIENT A ====================
    subgraph Client_A["Client A"]
        subgraph LLM_A["LLM & Adapters"]
            BA1[Base LLM]
            LA1[Behavior-Conditioned LoRA Adapter]
        end
        BS1[Behavioral Signature Module]
        PCAL1[Prompt-Class Anchoring Layer]
        AU1[Local Audit Branch Merkle]
    end

    %% ==================== CLIENT B ====================
    subgraph Client_B["Client B"]
        subgraph LLM_B["LLM & Adapters"]
            BA2[Base LLM]
            LA2[Behavior-Conditioned LoRA Adapter]
        end
        BS2[Behavioral Signature Module]
        PCAL2[Prompt-Class Anchoring Layer]
        AU2[Local Audit Branch Merkle]
    end

    %% ==================== DATA FLOW ARROWS ====================
    Client_A -->|LoRA & PCAL deltas| Central_Server
    Client_B -->|LoRA & PCAL deltas| Central_Server
    Central_Server -->|Global LoRA & PCAL| Client_A
    Central_Server -->|Global LoRA & PCAL| Client_B

    Client_A -- Dashed: Hashes & Trust Metrics --> Central_Server
    Client_B -- Dashed: Hashes & Trust Metrics --> Central_Server

    Central_Server -- Red ⚡ Rollback / Quarantine --> Client_A

    %% ==================== USER INTERACTION ====================
    UserA[User Prompt] --> Client_A
    Client_A --> OutputA[User Output]

    %% ==================== LEGEND (Styles) ====================
    classDef solidStroke stroke-width:2px;
    linkStyle 0 stroke:#000,stroke-width:2px;
    linkStyle 1 stroke:#000,stroke-width:2px;
    linkStyle 2 stroke:#000,stroke-width:2px;
    linkStyle 3 stroke:#000,stroke-width:2px;
    linkStyle 4 stroke-dasharray:5 5;
    linkStyle 5 stroke-dasharray:5 5;
    linkStyle 6 stroke:#f00,stroke-width:2px,stroke-dasharray:5 2;
```