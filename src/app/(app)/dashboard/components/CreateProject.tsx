'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createProject } from '../utils/fetchApi';
import { PROJECT_TYPES } from '@/types/constants/project';

const getDynamicPlaceholder = (type: string) => {
  switch (type) {
    case 'landing':
      return 'e.g., "Create a modern landing page with a hero section, testimonials, and a call-to-action button."';
    case 'email':
      return 'e.g., "Design a professional email template for a newsletter with a header, body, and footer."';
    case 'form':
      return 'e.g., "Build a contact form with fields for name, email, and message, styled for a corporate website."';
    default:
      return 'Enter an AI prompt to customize your project (optional)';
  }
};

export default function CreateProjectModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setOpen(false);
      setName('');
      setType('');
      setAiPrompt('');
      setStep(1);
    },
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && type) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, type, aiPrompt });
  };

  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Create New Project</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] z-50 bg-white rounded-lg shadow-xl"
        // overlayClassName="bg-black/50 backdrop-blur-sm fixed inset-0 z-40"
      >
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? 'Name Your Project' : 'Customize with AI'}
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step1"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={handleNext}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter project name"
                  required
                  
                />
              </div>
              <div>
                <Label htmlFor="type">Project Type</Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Next
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="aiPrompt">AI Prompt (Optional)</Label>
                <Textarea
                  id="aiPrompt"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={getDynamicPlaceholder(type)}
                  className="min-h-[120px] resize-y"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-1/2"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-1/2 bg-blue-600 hover:bg-blue-700"
                >
                  {mutation.isPending ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}