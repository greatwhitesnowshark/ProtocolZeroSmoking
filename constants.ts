import { RewireModule, Trigger } from './types';

export const DEFAULT_TRIGGERS: Trigger[] = [
  { id: '1', name: 'Morning Coffee', replacement: 'Drink water first, hold cup in other hand.', strategy: 'Disrupt routine.' },
  { id: '2', name: 'Driving', replacement: 'Chewing gum + Podcast.', strategy: 'Occupies mouth and mind.' },
  { id: '3', name: 'Post-Meal', replacement: 'Immediate brisk walk or brush teeth.', strategy: 'Change sensory input.' },
  { id: '4', name: 'Stress/Work', replacement: 'Box breathing (4-4-4-4).', strategy: 'Physiological reset.' },
];

export const REWIRE_MODULES: RewireModule[] = [
  {
    id: 'neuro-swish',
    title: 'The Swish Simulation',
    description: 'A neurological edit to replace trigger imagery.',
    type: 'NEURO_SIMULATION',
    content: [
      "Close your eyes. Take a deep breath.",
      "Imagine the Trigger (cigarette/vape) in a frame right in front of your face.",
      "See it clearly. Now drain the color. Make it black and white. Make it gritty.",
      "Shrink that image down to the size of a postage stamp.",
      "Now, BEHIND that stamp, imagine a massive, glowing cinema screen.",
      "On the screen is YOU. Free. Healthy. Richer. Powerful. Smiling.",
      "Get ready to swap them. Fast.",
      "1... 2... 3... SWISH!",
      "The small image explodes into dust.",
      "The glowing FREE version of you crashes into view, filling your mind.",
      "Step into that screen. Be that person.",
      "Feel the air in your lungs. Open your eyes."
    ]
  },
  {
    id: 'visualize-refusal',
    title: 'Visualization: The Refusal',
    description: 'See yourself saying no automatically.',
    type: 'VISUALIZATION',
    content: [
      'Close your eyes.',
      'Imagine a specific scenario where you are offered a smoke or feel an urge.',
      'See yourself looking at it with indifference.',
      'Hear yourself say "I do not smoke" calmly.',
      'Feel the relief of not being a slave to the impulse.',
    ]
  },
  {
    id: 'cognitive-reframe',
    title: 'Drill: Reframe the Need',
    description: 'Swap "I need" with "I notice".',
    type: 'REFRAMING',
    content: [
      'Identify the thought: "I need a smoke."',
      'Correction: "I notice I am having a sensation of tightness."',
      'Fact: Nicotine creates the void it claims to fill.',
      'Assertion: You are not depriving yourself; you are freeing yourself.',
    ]
  },
  {
    id: 'identity-lock',
    title: 'Identity Reinforcement',
    description: 'Solidify who you are.',
    type: 'IDENTITY',
    content: [
      'Repeat out loud: I am not a smoker trying to quit.',
      'Repeat: I am a non-smoker building a new life.',
      'Recall your #1 reason for freedom.',
      'The past does not dictate this moment.',
    ]
  },
];

export const RULES_CONTRACT = [
  "NO cigarettes. NO vaping. NO 'just one'.",
  "NO buying. NO carrying. NO holding for others.",
  "Cravings are not commands. They are noise.",
  "Delay Rule: If an urge hits, SOS Protocol is mandatory.",
  "We do not negotiate with addiction.",
];