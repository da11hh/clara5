import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Calendar, Clock } from "lucide-react";
import { Meeting } from "@/types/client";

interface NewMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeeting: (meeting: Meeting) => void;
}

export const NewMeetingModal = ({ isOpen, onClose, onAddMeeting }: NewMeetingModalProps) => {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    date: "",
    time: "",
    type: "online" as "online" | "presencial",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name || !formData.client_email || !formData.date || !formData.time) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const newMeeting: Meeting = {
      id: `meeting_${Date.now()}`,
      client_name: formData.client_name,
      client_email: formData.client_email,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: "scheduled",
      notes: formData.notes || undefined
    };

    onAddMeeting(newMeeting);
    setFormData({
      client_name: "",
      client_email: "",
      date: "",
      time: "",
      type: "online",
      notes: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="glass-card border-border/30 w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Nova Reunião</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Agende uma nova reunião com seu cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Nome do Cliente *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                placeholder="Nome completo do cliente"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_email">Email do Cliente *</Label>
              <Input
                id="client_email"
                type="email"
                value={formData.client_email}
                onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Reunião</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "online" | "presencial") => 
                  setFormData(prev => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Notas adicionais sobre a reunião..."
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                <Clock className="w-4 h-4 mr-2" />
                Agendar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};