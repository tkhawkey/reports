# Report comment names

A small web page for CIS staff who use AI (such as Copilot) to draft pupils' report comments.

School policy says no real names go into AI. Staff ask the AI to write comments with placeholder tags like `[NAME]` and `[HE/SHE]`. This page puts the pupil's real name and pronouns back in, on the teacher's own computer.

## Privacy

**Nothing you type here leaves your computer.**

- The whole tool is one file, `index.html`. All of its code is inside that file. It uses no other scripts, no fonts or images from other sites, and no analytics.
- A Content-Security-Policy in the page tells the browser to block every outgoing connection: `fetch`, XHR, WebSockets, beacons, form submissions, and loading anything from another site. The browser enforces this, not just the page's own code.
- **Quick comment** saves nothing. Its fields clear when you reload the page.
- **My classes** saves classes, names, pronouns and ticks in this browser's local storage, under the key `cis-report-comment-names:v1`. It never saves comments. The data stays on this computer and is never sent anywhere. Anyone who uses the same login on the same computer can see it, so don't use My classes on a shared login. **Delete all my data** removes it.

## Using it

1. Add this line to your AI prompt (the page has a Copy button for it):
   > Use [NAME] for the pupil's name, and [HE/SHE], [HIM/HER], [HIS/HER], [HIS/HERS] and [HIMSELF/HERSELF] for pronouns. Do not include any real names.
2. Paste the AI's comment into the page, choose the pupil, and copy the finished comment.

### Tags

| Tag | he | she | they |
|---|---|---|---|
| `[NAME]` (also `[CHILD NAME]`, `[CHILD'S NAME]`, `[PUPIL NAME]`, `[FIRST NAME]`) | name to use | name to use | name to use |
| `[HE/SHE]` | he | she | they |
| `[HIM/HER]` | him | her | them |
| `[HIS/HER]` (before a noun: "her book") | his | her | their |
| `[HIS/HERS]` (on its own: "it was hers") | his | hers | theirs |
| `[HIMSELF/HERSELF]` | himself | herself | themselves |

- Tags work in any case and any order, with or without spaces: `[she / he]` works the same as `[HE/SHE]`.
- A filled-in word gets a capital letter at the start of the comment, at the start of a line, or after `.` `!` `?` and a space. It also gets one when the tag is written in title case, like `[He/She]`.

The page highlights things that probably need fixing, without stopping you copying:

- leftover tags in `[ ]`, `< >` or `{ }`
- leftover choices like he/she, s/he or "his or her"
- for pupils using "they", verbs that don't agree, like "they is" or "they has"

## Files

- `index.html`: the tool.
- `tests/index.html`: browser tests. After publishing, open `/tests/` on the site and they run against the live page.
- `tests/run-tests.js`: the same engine tests and source checks in Node (`node tests/run-tests.js`).

## Publishing on GitHub Pages

Push this folder to a repository, then go to **Settings → Pages** and publish from the main branch, root folder.
