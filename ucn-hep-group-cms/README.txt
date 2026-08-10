└── ucn-hep-group-cms/      ← Sanity Studio
    ├── schemaTypes/
    ├── sanity.config.js/ts
    ├── sanity.cli.js/ts
    ├── package.json
    └── ...


To create the project is executed this line of code:


PS C:\Users\zamor\OneDrive\Documentos\GitHub\hep-group-ucn\ucn-hep-group-cms> npx sanity@latest init --project cu620ne1 --dataset production --template clean --output-path .

Need to install the following packages:
sanity@6.9.1
Ok to proceed? (y) y
npm warn deprecated uuid@10.0.0: uuid@10 and below is no longer supported.  For ESM codebases, update to uuid@latest.  For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).
 »   Warning: No valid authentication credentials found.
 »
 »   Authenticate with one of these commands:
 »     echo "$TOKEN" | sanity login --with-token
 »     sanity login --provider <providerId> --no-open
 »       Provider IDs: google, github, sanity, vercel
 »     sanity login --sso <organizationSlug> --no-open
 »
 »   `--no-open` prints a login URL instead of opening a browser.
? Please log in or create a new account
❯ Google
  GitHub
  E-mail / password
