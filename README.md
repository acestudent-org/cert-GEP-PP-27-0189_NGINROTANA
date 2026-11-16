# ACE Certificate Page

A static page (certificate for NGIN ROTANA) with `index.html` at the root and its CSS/JS/image assets in sibling folders, ready to push to GitHub.

## Push to GitHub

```bash
cd acestudent-certificate-site   # the extracted folder
git init
git add .
git commit -m "Add certificate page"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first, via "New repository" — don't add a README there, or you'll have to `git pull` to merge it.)

## Host it live with GitHub Pages (optional)

1. On GitHub, open the repo → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Pick branch `main`, folder `/ (root)`, then **Save**.
4. Your page goes live in a minute or two at `https://<your-username>.github.io/<your-repo>/`.
