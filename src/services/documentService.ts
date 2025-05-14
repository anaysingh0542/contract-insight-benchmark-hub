
import { Document, DocumentStatus, Playbook } from "../types";
import { mockDocuments, mockPlaybooks } from "../data/mockData";
import { toast } from "sonner";

// This would normally interact with an API
// For demo purposes, we're using mock data

let documents = [...mockDocuments];
let playbooks = [...mockPlaybooks];

export const documentService = {
  getAllDocuments: (): Document[] => {
    return [...documents];
  },
  
  getDocumentById: (id: string): Document | undefined => {
    return documents.find(doc => doc.id === id);
  },
  
  getAllPlaybooks: (): Playbook[] => {
    return [...playbooks];
  },
  
  getPlaybookById: (id: string): Playbook | undefined => {
    return playbooks.find(playbook => playbook.id === id);
  },
  
  assignPlaybook: (documentId: string, playbookId: string): boolean => {
    const docIndex = documents.findIndex(doc => doc.id === documentId);
    if (docIndex === -1) return false;
    
    documents[docIndex] = {
      ...documents[docIndex],
      playbookId,
      status: DocumentStatus.PENDING_LABELING
    };
    
    return true;
  },
  
  uploadDocument: (file: File): Promise<Document> => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        const newDoc: Document = {
          id: `d${documents.length + 1}`,
          name: file.name,
          uploadDate: new Date(),
          status: DocumentStatus.UPLOADED,
          goldenDatasetCreated: false
        };
        
        documents = [...documents, newDoc];
        toast.success("Document uploaded successfully");
        resolve(newDoc);
      }, 1500);
    });
  },
  
  updateDocumentStatus: (documentId: string, status: DocumentStatus): boolean => {
    const docIndex = documents.findIndex(doc => doc.id === documentId);
    if (docIndex === -1) return false;
    
    documents[docIndex] = {
      ...documents[docIndex],
      status
    };
    
    return true;
  },
  
  setGoldenDatasetCreated: (documentId: string, created: boolean): boolean => {
    const docIndex = documents.findIndex(doc => doc.id === documentId);
    if (docIndex === -1) return false;
    
    documents[docIndex] = {
      ...documents[docIndex],
      goldenDatasetCreated: created,
      status: created ? DocumentStatus.LABELED : DocumentStatus.PENDING_LABELING
    };
    
    return true;
  }
};
