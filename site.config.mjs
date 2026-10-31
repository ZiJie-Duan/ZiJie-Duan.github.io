// Everything about the site that is not a document lives here: who runs it,
// how to reach them, and which apps it covers. Documents may use
// {{owner}}, {{email}} and {{site}}; they are filled in at build time.

export const site = {
  // Where the site is published. A project repository (not <user>.github.io)
  // also needs `base` set to '/<repository>'.
  url: 'https://zijie-duan.github.io',
  base: '',
  owner: 'ZiJie Duan',
  // TODO: the address testers and reviewers should write to.
  email: 'TODO-your-contact-email@example.com',
  name: { zh: 'ZiJie Duan 的应用', en: 'Apps by ZiJie Duan' },
  intro: {
    zh: '这里是我开发的应用的隐私政策、使用条款和测试说明。',
    en: 'Privacy policies, terms and beta guides for the apps I make.',
  },
};

/** Documents every app may have, in the order they are listed. */
export const docKinds = ['privacy', 'terms', 'beta', 'support'];

export const apps = [
  {
    slug: 'utter',
    name: 'Utter',
    tagline: {
      zh: '语音优先的中文输入法：说出来，整理好，直接上屏。',
      en: 'A voice-first keyboard: say it, get it tidied up, have it typed in.',
    },
    // TestFlight public link; empty until the beta opens.
    testflight: '',
  },
];

export const labels = {
  zh: {
    privacy: '隐私政策',
    terms: '使用条款',
    beta: 'Beta 测试说明',
    support: '支持与联系',
    updated: '最后更新',
    joinBeta: '加入 TestFlight 测试',
    betaSoon: '测试邀请链接即将公布',
    contact: '联系',
    home: '首页',
    other: 'English',
    documents: '文档',
  },
  en: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    beta: 'Beta Testing Guide',
    support: 'Support',
    updated: 'Last updated',
    joinBeta: 'Join the TestFlight beta',
    betaSoon: 'The invitation link is coming soon',
    contact: 'Contact',
    home: 'Home',
    other: '中文',
    documents: 'Documents',
  },
};
