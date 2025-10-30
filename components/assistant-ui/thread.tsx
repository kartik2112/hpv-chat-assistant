import { useState, useRef, useEffect } from "react";
import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ErrorPrimitive,
  useAssistantApi,
  useAssistantInstructions
} from "@assistant-ui/react";
import type { FC } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  CopyIcon,
  CheckIcon,
  PencilIcon,
  RefreshCwIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Square,
  Mic,
  SpeakerIcon,
  Speaker,
} from "lucide-react";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MarkdownText } from "./markdown-text";
// import { ToolFallback } from "./tool-fallback";

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      // aui-thread-root
      className="bg-background flex h-full flex-col"
      style={{
        ["--thread-max-width" as string]: "48rem",
        ["--thread-padding-x" as string]: "1rem",
      }}
    >
      {/* aui-thread-viewport */}
      <ThreadPrimitive.Viewport className="relative flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            EditComposer,
            AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          {/* aui-thread-viewport-spacer */}
          <motion.div className="min-h-6 min-w-6 shrink-0" />
        </ThreadPrimitive.If>
      </ThreadPrimitive.Viewport>

      <Composer />
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        // aui-thread-scroll-to-bottom
        className="dark:bg-background dark:hover:bg-accent absolute -top-12 z-10 self-center rounded-full p-4 disabled:invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      {/* aui-thread-welcome-root */}
      <div className="mx-auto flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col px-[var(--thread-padding-x)]">
        {/* aui-thread-welcome-center */}
        <div className="flex w-full flex-grow flex-col items-center justify-center">
          {/* aui-thread-welcome-message */}
          <div className="flex size-full flex-col justify-center px-8 md:mt-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
              // aui-thread-welcome-message-motion-1
              className="text-2xl font-semibold"
            >
              Hello!
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.6 }}
              // aui-thread-welcome-message-motion-2
              className="text-muted-foreground/65 text-2xl"
            >
              I can answer any questions you have about HPV.<br/>
              Puedo responder cualquier pregunta que tengas sobre el VPH.
            </motion.div>
          </div>
        </div>
      </div>
    </ThreadPrimitive.Empty>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  const initialSuggestions = [
    {
      title: "What is HPV?",
      label: "",
      action: "What is HPV?",
      defaultAnswer: "HPV (Human Papillomavirus) is a group of related viruses, some of which can cause warts or lead to certain cancers.",
      followups: [
        { title: "How common is HPV?", action: "How common is HPV?", defaultAnswer: "HPV is very common — most sexually active people will get it at some point in their lives." },
        { title: "How is it passed from one person to another?", action: "How is it passed from one person to another?", defaultAnswer: "HPV is usually transmitted through intimate skin-to-skin contact, often during sexual activity." },
        { title: "What are symptoms of HPV infection?", action: "What are symptoms of HPV infection?", defaultAnswer: "Many HPV infections have no symptoms; some cause warts, while high-risk types can lead to precancerous changes over time." },
        { title: "Can HPV infections be treated?", action: "Can HPV infections be treated?", defaultAnswer: "There is no cure for the virus itself, but many HPV-related conditions (like warts or precancerous lesions) can be treated." },
      ],
    },
    {
      title: "How can I protect against HPV?",
      label: ``,
      action: `How can I protect against HPV?`,
      defaultAnswer: "HPV infection can be reduced by vaccination, practicing safe sex, and regular health screenings.",
      followups: [
        { title: "Is the HPV vaccine safe?", action: "Is the HPV vaccine safe?", defaultAnswer: "Yes — large studies show the HPV vaccine is safe for recommended age groups." },
        { title: "Is the HPV vaccine effective?", action: "Is the HPV vaccine effective?", defaultAnswer: "The vaccine is highly effective at preventing infection by the HPV types it targets, especially when given before exposure." },
        { title: "When should people get the HPV vaccine?", action: "When should people get the HPV vaccine?", defaultAnswer: "It's recommended for preteens (ages 11–12) though catch-up vaccination is available for older individuals up to certain ages." },
        { title: "What are the side effects of the HPV vaccine?", action: "What are the side effects of the HPV vaccine?", defaultAnswer: "Side effects are usually mild — soreness at the injection site, low-grade fever, or headache are common." },
      ],
    },
    {
      title: "Why should I be worried about HPV?",
      label: ``,
      action: `Why should I be worried about HPV?`,
      defaultAnswer: "HPV is a common sexually transmitted infection that can lead to serious health issues, including certain cancers.",
      followups: [
        { title: "When can HPV infection cause cancer?", action: "When can HPV infection cause cancer?", defaultAnswer: "Persistent infection with high-risk HPV types over many years can lead to cellular changes and, rarely, cancer." },
        { title: "How long does cervical cancer take to develop?", action: "How long does cervical cancer take to develop?", defaultAnswer: "It can take several years to many decades; regular screening detects precancerous changes early." },
        { title: "Can I get the HPV vaccine if I've already had an infection or cancer?", action: "Can I get the HPV vaccine if I've already had an infection or cancer?", defaultAnswer: "You can still benefit from the vaccine even if you've had an HPV infection, but consult a clinician if you have a history of HPV-related cancer." },
      ],
    },
    {
      title: "Do I still need Pap smears if I had the HPV vaccine?",
      label: "",
      action: "Do I still need Pap smears if I had the HPV vaccine?",
      defaultAnswer: "Yes, even if you have had the HPV vaccine, regular Pap smears are still recommended to screen for cervical cancer.",
      followups: [
        { title: "How do we screen/check for cervical cancer?", action: "How do we screen/check for cervical cancer?", defaultAnswer: "Cervical cancer screening typically uses Pap smears and/or HPV testing to find precancerous changes early." },
        { title: "When should I be tested for HPV?", action: "When should I be tested for HPV?", defaultAnswer: "Follow national screening guidelines; often testing starts in young adulthood or as recommended by clinicians." },
      ],
    },
  ];

  const [selectedMain, setSelectedMain] = useState<number | null>(null);
  const [selectedFollowup, setSelectedFollowup] = useState<number | null>(null);

  return (
    // aui-thread-welcome-suggestions
    <div className="grid w-full gap-2 sm:grid-cols-2">
      {selectedMain === null ? (
      initialSuggestions.map((suggestedAction, index) => (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.05 * index }}
        key={`suggested-action-${suggestedAction.title}-${index}`}
        // aui-thread-welcome-suggestion-display
        className="[&:nth-child(n+3)]:hidden sm:[&:nth-child(n+3)]:block"
        >
        <Button
          variant="ghost"
          // aui-thread-welcome-suggestion
          className="dark:hover:bg-accent/60 h-auto w-full flex-1 flex-wrap items-start justify-start gap-1 rounded-xl border px-4 py-3.5 text-left text-sm sm:flex-col"
          aria-label={suggestedAction.action}
          onClick={() => {
            setSelectedMain(index);
            setSelectedFollowup(null);
          }}
        >
          {/* aui-thread-welcome-suggestion-text-1 */}
          <span className="font-medium">{suggestedAction.title}</span>
          {/* aui-thread-welcome-suggestion-text-2 */}
          <p className="text-muted-foreground">{suggestedAction.label}</p>
        </Button>
        </motion.div>
      ))
      ) : (
      <>
        {/* Default answer display (now includes the main question/title) */}
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.1 }}
        className="sm:col-span-2 col-span-2 mb-2"
        >
        <div className="bg-muted border px-4 py-3 rounded-xl text-base text-foreground">
          <div className="font-medium mb-2">{initialSuggestions[selectedMain!].title}</div>
          <div>{initialSuggestions[selectedMain!].defaultAnswer}</div>
        </div>
        </motion.div>
        {/* If a followup is focused, show that followup's default answer and actions */}
        {selectedFollowup !== null ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.1 }}
          className="sm:col-span-2 col-span-2 mb-2"
        >
          <div className="bg-muted border px-4 py-3 rounded-xl text-base text-foreground">
          <div className="font-medium mb-2">{initialSuggestions[selectedMain!].followups[selectedFollowup].title}</div>
          <div className="text-muted-foreground mb-3">{initialSuggestions[selectedMain!].followups[selectedFollowup].defaultAnswer}</div>
          {/* <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => setSelectedFollowup(null)}>Back</Button>
          </div> */}
          </div>
        </motion.div>
        ) : (
        /* Follow-up questions with preview & Ask */
        initialSuggestions[selectedMain!].followups.map((followup, idx) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * idx }}
          key={`followup-action-${followup.title}-${idx}`}
          // aui-thread-welcome-followup-display
          className="sm:col-span-1  flex justify-center"
        >
          <Button
          variant="ghost"
          asChild
          aria-label={`View followup: ${followup.title}`}
          onClick={() => setSelectedFollowup(idx)}
          >
          <div className="rounded-xl border px-4 py-3 mb-2 w-full text-left flex items-start">
            <div className="font-medium text-left">{followup.title}</div>
          </div>
          </Button>
        </motion.div>
        ))
        )}
        {/* Back button */}
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2 }}
        className="sm:col-span-2 flex justify-center mt-2"
        >
        <Button variant="outline" size="sm" onClick={() => {
          if (selectedFollowup !== null) setSelectedFollowup(null);
          else setSelectedMain(null);
        }}>
          Back
        </Button>
        </motion.div>
      </>
      )}
    </div>
  );
};

const Composer: FC = () => {
  return (
    // aui-composer-wrapper
    <div className="bg-background relative mx-auto flex w-full max-w-[var(--thread-max-width)] flex-col gap-4 px-[var(--thread-padding-x)] pb-4 md:pb-6">
      <ThreadScrollToBottom />
      <ThreadPrimitive.Empty>
        <ThreadWelcomeSuggestions />
      </ThreadPrimitive.Empty>
      {/* aui-composer-root */}
      <ComposerPrimitive.Root className="focus-within::ring-offset-2 relative flex w-full flex-col rounded-2xl focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white">
        {/* aui-composer-input */}
        <ComposerPrimitive.Input
          placeholder="Send a message..."
          className={
            "bg-muted border-border dark:border-muted-foreground/15 focus:outline-primary placeholder:text-muted-foreground max-h-[calc(50dvh)] min-h-16 w-full resize-none rounded-t-2xl border-x border-t px-4 pt-2 pb-3 text-base outline-none"
          }
          rows={1}
          autoFocus
          aria-label="Message input"
        />
        <ComposerAction />
      </ComposerPrimitive.Root>
    </div>
  );
};

const ComposerAction: FC = () => {
  const [listening, setListening] = useState(false);
  // Define a minimal local speech recognition interface to avoid depending on
  // lib.dom types and to keep lint/type checks happy.
  interface ISpeechRecognition {
    lang: string;
    interimResults: boolean;
    maxAlternatives?: number;
    start(): void;
    stop(): void;
    onresult?: (event: { results: any[] }) => void;
    onend?: () => void;
  }

  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonEl = useRef<HTMLButtonElement | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const api = useAssistantApi();
  const SYSTEM_MESSAGE = "You are a helpful medical assistant specializing in HPV-related information. Provide accurate and concise answers based on the latest medical guidelines and research. Please answer the questions as you would explain to a five-year old. Avoid using complex medical jargon unless absolutely necessary, and always aim to educate in a clear and friendly manner. Don't make the answers sound scary or verbose. At the same time, attempt to stick to an answer that's very short. If you don't know the answer, simply say you don't know. If the question is not related to the HPV, politely decline to answer.";
  useAssistantInstructions(SYSTEM_MESSAGE);

  useEffect(() => {
    // locate the composer input element in the DOM once
    const el = document.querySelector('textarea[aria-label="Message input"]') as HTMLTextAreaElement | null;
    if (el) inputRef.current = el;

    // locate the send message button element in the DOM once
    buttonEl.current = document.querySelector('button[aria-label="Send message"]') as HTMLButtonElement | null;

    return () => {
      if (countdownRef.current) {
        window.clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, []);

  const startListening = () => {
    // Narrowly type access to the global constructors without using `any`.
    type SpeechRecognitionGlobal = {
      SpeechRecognition?: { new (): ISpeechRecognition };
      webkitSpeechRecognition?: { new (): ISpeechRecognition };
    };

    const globalObj = window as unknown as SpeechRecognitionGlobal;
    const ctor = globalObj.SpeechRecognition ?? globalObj.webkitSpeechRecognition;
    if (!ctor) {
      console.warn("SpeechRecognition not supported in this browser");
      return;
    }

    const recog = new ctor();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    // recog.onresult = (event) => {
    //   // event.results typing is implementation dependent; access safely
    //   const result = event.results?.[0]?.[0];
    //   const text = result?.transcript ?? "";
    //   if (inputRef.current) {
    //     inputRef.current.value = text;
    //     inputRef.current.innerText = text;
    //     // focus the textarea so the composer registers user interaction
    //     try {
    //       inputRef.current.focus();
    //       if (buttonEl.current) buttonEl.current.disabled = false;
    //     } catch (e) {
    //       /* ignore */
    //     }

    //     // dispatch an InputEvent so frameworks (React) and the composer primitive
    //     // observe the change and enable the Send button.
    //     let inputEvent;
    //     try {
    //       inputEvent = new InputEvent('input', { bubbles: true, cancelable: true });
    //     } catch (err) {
    //       // InputEvent may not be available in some environments (or during SSR checks).
    //       inputEvent = new Event('input', { bubbles: true, cancelable: true });
    //     }

    //     inputRef.current.dispatchEvent(inputEvent);

    //     // also dispatch a change event as a fallback for any listeners
    //     inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    //   }
    // };

    const add_messages_to_thread = (text: string) => {
      const api_thread_instance = api.thread();
      try {
              // Try to extract the visible suggestion / followup text from the DOM.
              // ThreadWelcomeSuggestions renders the selected main answer inside a
              // div with "bg-muted" and followup (when selected) contains a
              // ".font-medium" (title) and ".text-muted-foreground" (answer).
                const bgMutedEls = Array.from(document.querySelectorAll('div.bg-muted'));
                let mainQuestion: string | null = null;
                let mainAnswer: string | null = null;
                let followupTitle: string | null = null;
                let followupAnswer: string | null = null;

                if (bgMutedEls.length > 0) {
                // Use the first visible bg-muted block as the main suggestion answer preview
                const first = bgMutedEls[0] as HTMLElement;

                // Try to extract a main title if present (rendered with .font-medium)
                const mainTitleEl = first.querySelector('.font-medium');
                if (mainTitleEl?.textContent) {
                  mainQuestion = mainTitleEl.textContent.trim();
                  // Remove the title from the innerText to get a cleaner main answer preview
                  const raw = first.innerText || '';
                  mainAnswer = raw.replace(mainTitleEl.textContent, '').trim() || null;
                } else {
                  // fallback: use the whole block text as the answer
                  mainAnswer = first.innerText?.trim() ?? null;
                }

                // Prefer an element that contains a followup answer (.text-muted-foreground)
                const followupEl = bgMutedEls.find((el) => el.querySelector('.text-muted-foreground'));
                if (followupEl) {
                  followupTitle = (followupEl.querySelector('.font-medium')?.textContent || '').trim() || null;
                  followupAnswer = (followupEl.querySelector('.text-muted-foreground')?.textContent || '').trim() || null;
                }
                }

                console.log('Selected main question & answer:', mainQuestion ?? '(no title)', '-', mainAnswer);
                if (followupTitle || followupAnswer) {
                console.log('Selected followup:', followupTitle, followupAnswer);
                }

              
              api.thread().append({
                role: "user",
                content: [{ type: "text", text:  mainQuestion || "Question about HPV" }],
              });

              
              api_thread_instance.append({
                role: "assistant",
                content: [{ type: "text", text:  mainAnswer || "Answer about HPV" }],
              });

              if (followupTitle || followupAnswer) {
                api_thread_instance.append({
                  role: "user",
                  content: [{ type: "text", text:  followupTitle || "Question about HPV" }],
                });

                api_thread_instance.append({
                  role: "assistant",
                  content: [{ type: "text", text:  followupAnswer || "Answer about HPV" }],
                });
              }


              // Always set the composer input to the recognized transcript
              api_thread_instance.composer.setText(text);
              console.log("Auto-sending message:", text);
              // buttonEl.current.click();
              api_thread_instance.composer.send();

              
            } catch (err) {
              console.warn('Failed to read selected suggestion/followup from DOM or add to thread:', err);
              // fallback: keep just the transcript in the composer
              api_thread_instance.composer.setText(text);
              console.log("Auto-sending message:", text);
              // buttonEl.current.click();
              api_thread_instance.composer.send();
            }
    };

    recog.onresult = (event) => {

      

      // When recording ends, show a short countdown before auto-send so user can cancel
      try {
        const result = event.results?.[0]?.[0];
        const text = result?.transcript ?? "";
        if (text && buttonEl.current) {
          add_messages_to_thread(text);
          // api.composer().reset();
          inputRef.current.value = "";
          inputRef.current.innerText = "";
        }
      } catch (err) {
        console.warn("Auto-send failed:", err);
      }
    };

    recognitionRef.current = recog;
    recog.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  };

  return (
    // aui-composer-action-wrapper
    <div className="bg-muted border-border dark:border-muted-foreground/15 relative flex items-center justify-between rounded-b-2xl border-x border-b p-2">
      {/* <TooltipIconButton
        tooltip="Attach file"
        variant="ghost"
        // aui-composer-attachment-button
        className="hover:bg-foreground/15 dark:hover:bg-background/50 scale-115 p-3.5"
        onClick={() => {
          console.log("Attachment clicked - not implemented");
        }}
      >
        <PlusIcon />
      </TooltipIconButton> */}

      {/* Microphone button for voice input */}
      <TooltipIconButton
        tooltip={listening ? "Stop recording" : "Record voice"}
        variant={listening ? "default" : "ghost"}
        className="hover:bg-foreground/15 dark:hover:bg-background/50 scale-115 p-3.5"
        onClick={() => {
          if (listening) {
            // stopping should cancel any pending countdown
            if (countdownRef.current) {
              window.clearInterval(countdownRef.current);
              countdownRef.current = null;
            }
            setCountdown(null);
            stopListening();
          } else startListening();
        }}
      >
        <Mic />
      </TooltipIconButton>

      {/* Countdown badge shown after recording stops and before auto-send */}
      {countdown !== null && (
        <div className="ml-2 inline-flex items-center justify-center rounded-full bg-accent px-2 py-1 text-sm font-semibold text-accent-foreground">
          {countdown}
        </div>
      )}

      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <Button
            type="submit"
            variant="default"
            // aui-composer-send
            className="dark:border-muted-foreground/90 border-muted-foreground/60 hover:bg-primary/75 size-8 rounded-full border"
            aria-label="Send message"
          >
            {/* aui-composer-send-icon */}
            <ArrowUpIcon className="size-5" />
          </Button>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>

      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <Button
            type="button"
            variant="default"
            // aui-composer-cancel
            className="dark:border-muted-foreground/90 border-muted-foreground/60 hover:bg-primary/75 size-8 rounded-full border"
            aria-label="Stop generating"
          >
            {/* aui-composer-cancel-icon */}
            <Square className="size-3.5 fill-white dark:size-4 dark:fill-black" />
          </Button>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </div>
  );
};

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      {/* aui-message-error-root */}
      <ErrorPrimitive.Root className="border-destructive bg-destructive/10 dark:bg-destructive/5 text-destructive mt-2 rounded-md border p-3 text-sm dark:text-red-200">
        {/* aui-message-error-message */}
        <ErrorPrimitive.Message className="line-clamp-2" />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root asChild>
      <motion.div
        // aui-assistant-message-root
        className="relative mx-auto grid w-full max-w-[var(--thread-max-width)] grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] px-[var(--thread-padding-x)] py-4"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role="assistant"
      >
        {/* aui-assistant-message-avatar */}
        <div className="ring-border bg-background col-start-1 row-start-1 flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
          <StarIcon size={14} />
        </div>

        {/* aui-assistant-message-content */}
        <div className="text-foreground col-span-2 col-start-2 row-start-1 ml-4 leading-7 break-words">
          <MessagePrimitive.Content
            components={{
              Text: MarkdownText,
              // tools: { Fallback: ToolFallback },
            }}
          />
          <MessageError />
        </div>

        <AssistantActionBar />

        {/* aui-assistant-branch-picker */}
        <BranchPicker className="col-start-2 row-start-2 mr-2 -ml-2" />
      </motion.div>
    </MessagePrimitive.Root>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      // aui-assistant-action-bar-root
      className="text-muted-foreground data-floating:bg-background col-start-3 row-start-2 mt-3 ml-3 flex gap-1 data-floating:absolute data-floating:mt-2 data-floating:rounded-md data-floating:border data-floating:p-1 data-floating:shadow-sm"
    >
      {/* <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy> */}
      <ActionBarPrimitive.Speak asChild>
        <TooltipIconButton tooltip="Start speaking">
          <SpeakerIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Speak>
      <ActionBarPrimitive.StopSpeaking asChild>
        <TooltipIconButton tooltip="Stop speaking">
          <Speaker />
        </TooltipIconButton>
      </ActionBarPrimitive.StopSpeaking>
    </ActionBarPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root asChild>
      <motion.div
        // aui-user-message-root
        className="mx-auto grid w-full max-w-[var(--thread-max-width)] auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-1 px-[var(--thread-padding-x)] py-4 [&:where(>*)]:col-start-2"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role="user"
      >
        <UserActionBar />

        {/* aui-user-message-content */}
        <div className="bg-muted text-foreground col-start-2 rounded-3xl px-5 py-2.5 break-words">
          <MessagePrimitive.Content components={{ Text: MarkdownText }} />
        </div>

        {/* aui-user-branch-picker */}
        <BranchPicker className="col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
      </motion.div>
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      // aui-user-action-bar-root
      className="col-start-1 mt-2.5 mr-3 flex flex-col items-end"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit">
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    // aui-edit-composer-wrapper
    <div className="mx-auto flex w-full max-w-[var(--thread-max-width)] flex-col gap-4 px-[var(--thread-padding-x)]">
      {/* aui-edit-composer-root */}
      <ComposerPrimitive.Root className="bg-muted ml-auto flex w-full max-w-7/8 flex-col rounded-xl">
        {/* aui-edit-composer-input */}
        <ComposerPrimitive.Input
          className="text-foreground flex min-h-[60px] w-full resize-none bg-transparent p-4 outline-none"
          autoFocus
        />

        {/* aui-edit-composer-footer */}
        <div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
          <ComposerPrimitive.Cancel asChild>
            <Button variant="ghost" size="sm" aria-label="Cancel edit">
              Cancel
            </Button>
          </ComposerPrimitive.Cancel>
          <ComposerPrimitive.Send asChild>
            <Button size="sm" aria-label="Update message">
              Update
            </Button>
          </ComposerPrimitive.Send>
        </div>
      </ComposerPrimitive.Root>
    </div>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      // aui-branch-picker-root
      className={cn(
        "text-muted-foreground inline-flex items-center text-xs",
        className,
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      {/* aui-branch-picker-state */}
      <span className="font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z"
      fill="currentColor"
    />
  </svg>
);
