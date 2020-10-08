#!/bin/sh

echo "Possible intents for release:"
echo "  [a] testing and validating newly developed features (alpha)"
echo "  [b] testing bug fixes, performance improvements, refactoring, etc. (beta)"
echo "  [d] production release"
read -p "What is your intent for this release? " intent
echo ""

if [[ -z "$intent" ]]; then
  echo "[error] no intent provided"
  exit 1
elif [[ $intent != "a" ]] && [[ $intent != "b" ]] && [[ $intent != "d" ]]; then
  echo "[error] intent must be one of these: a, b or d"
  exit 1
fi

read -p "Would you like to have a dry run? (default: y) " dryrun
echo ""

if [[ $dryrun != "n" ]]; then
  dryrun="y"
fi

cmd_ver="npm run release"

if [[ $intent == "d" ]]; then
  if [[ $dryrun == "n" ]]; then
    cmd_ver+=" && git add ."
    eval $cmd_ver
  else
    cmd_ver+=" -- --dry-run"
    eval $cmd_ver
  fi
  exit 0
fi

prerelease="alpha"

if [[ $intent == "b" ]]; then
  prerelease="beta"
fi

cmd_ver+=" -- --prerelease $prerelease"

if [[ $dryrun == "y" ]]; then
  cmd_ver+=" --dry-run"
else
  cmd_ver+=" && git add ."
fi

eval $cmd_ver