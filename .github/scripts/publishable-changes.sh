#!/usr/bin/env bash
# Usage: publishable-changes.sh <base> <head>
#
# Fails if a file changed between base and head would be in the npm tarball.
# The tarball list comes from npm itself, so new source folders are covered
# without editing this script. README and LICENSE are always packed by npm,
# but they are documentation, so they are ignored.
set -euo pipefail

BASE=$1
HEAD=$2

PACKED=$(npm pack --dry-run --ignore-scripts --json 2>/dev/null \
  | node -e 'let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
      for (const f of JSON.parse(s)[0].files) console.log(f.path);
    });')

CHANGED=$(git diff --name-only "$BASE" "$HEAD")

HITS=$(comm -12 <(echo "$PACKED" | sort -u) <(echo "$CHANGED" | sort -u) \
  | grep -v -E '^(README|LICENSE)' || true)

if [ -n "$HITS" ]; then
  echo "$HITS"
  exit 1
fi
