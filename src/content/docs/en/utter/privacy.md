---
title: Privacy Policy
updated: 2026-10-31
summary: What Utter handles, where it goes and where it is kept.
---

Utter is an iOS keyboard and voice input app made by {{owner}} (an individual developer, "we" below). This policy explains what information Utter handles, why, who it is sent to, and how you control it.

> **In short**
>
> - Typing on the keyboard is handled entirely on your phone and never uploaded.
> - Only when you use voice input are the recording and a little related text sent to Alibaba Cloud Model Studio for recognition and tidying up.
> - We run no servers of our own. We do not receive, store or sell your recordings or text, and we do no ad tracking or analytics.

## 1. Typing

- Pinyin, English input and corrections all run on your device, with dictionaries and models built into the app. What you type is not sent anywhere.
- To type more accurately, the keyboard remembers on your device where you tend to tap each key, the English words you use, and the spellings you choose to keep. This stays on your device.
- The keyboard reads iOS Text Replacements and contact names (the system's supplementary lexicon), only to correct typing on your device.
- iOS requires "Full Access" before the keyboard can share data with the Utter app and use voice input. With it on, Utter still does not upload what you type.

## 2. Voice input

### When Utter records

With Voice turned on, the Utter app keeps the microphone ready so you can start talking from the keyboard at any time. Between dictations Utter's microphone input is muted and nothing is captured. Only the sound from when you tap the voice button until you finish is recorded.

### What is sent, and to whom

Speech recognition and text tidying are done by Alibaba Cloud Model Studio (also called DashScope), in its Singapore (international) region by default. For each dictation your device sends directly to Alibaba Cloud:

| What | Why |
|---|---|
| The recording (streamed live; on a poor connection, sent in compressed pieces) | Speech recognition |
| The text before the cursor in the field (up to 2,000 characters), and earlier recognized text when you continue a recording | Context for more accurate recognition |
| Your hotwords and glossary from Settings | Recognizing and spelling names and terms correctly |
| The recognized text (with "Tidy Up Dictation" on) | Removing fillers and repeats, fixing typos and punctuation, layout |
| Text recognized while you talk (with "Show Key Points While Talking" on) | Generating the key points |

These requests use the API key configured in the app and go straight from your device to Alibaba Cloud, not through us. We do not receive, store or see your recordings or text. Alibaba Cloud's handling of this data is governed by its [privacy policy](https://www.alibabacloud.com/help/en/legal/latest/alibaba-cloud-international-website-privacy-policy) and terms of service.

### What is kept on your device

- **Unfinished recordings**: so that nothing is lost to a crash, a closed keyboard or a dropped connection, recordings and recognized text are kept in the Utter app's storage on your device. Once the text has been typed in, its recording is deleted automatically. Up to the 5 most recent unfinished recordings are kept, and the keyboard offers to "Continue recording"; if you discard one, its recognized text goes to the in-app Inbox and the recording is deleted.
- **Inbox**: text you save to the Inbox stays on your device.
- **Settings**: hotwords, glossary and switches stay on your device. The API key is kept in the iOS Keychain and used only for requests to Alibaba Cloud.

## 3. Diagnostic logs

Utter keeps logs on your device, such as timings, errors, memory use and the number and size of requests, to help fix problems. The logs **do not contain** anything you type or say. They stay on your device; each log file is capped at about 1 MB and older entries are overwritten. We cannot see them unless you choose to share them with us.

## 4. App updates

Utter uses Expo's update service (EAS Update) to check for and download app updates. When it checks, your device sends Expo technical information such as the app version, runtime version and platform, along with the IP address that comes with any network request. Expo handles this under its [privacy policy](https://expo.dev/privacy).

## 5. TestFlight

When you test a beta, Apple collects crash reports, installs and usage time under TestFlight's terms and makes them available to the developer. Feedback you send through TestFlight, including screenshots and comments, is also sent to the developer. See Apple's TestFlight terms for details.

## 6. What we don't do

- No account is needed. We do not collect your name, phone number, email address or other identity information.
- We do not sell or rent any of your information, or use it for advertising or marketing.
- We use no third-party advertising or analytics SDKs and do not track you across apps or websites.

## 7. Permissions

- **Microphone**: for voice input.
- **Keyboard "Full Access"**: for sharing voice status, context and results between the keyboard and the Utter app.

You can turn these off at any time in iOS Settings; the related features will then stop working.

## 8. Deleting your data

- Deleting the Utter app deletes everything it keeps on your device, including saved recordings, the Inbox, settings and typing data.
- Data already sent to Alibaba Cloud is handled under Alibaba Cloud's policies, under which you can exercise your rights.
- For anything else, contact us.

## 9. Children

Utter is not designed for children. We do not knowingly collect anyone's personal information or knowingly provide the service to children.

## 10. Changes

If this policy changes in an important way, we will update this page and the "Last updated" date above, and tell you in the app when needed.

## 11. Contact

Questions about this policy or your data: [{{email}}](mailto:{{email}}).
