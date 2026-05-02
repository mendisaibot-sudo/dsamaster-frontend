#!/bin/bash
# Docker executor script for DSAMaster
# Usage: run.sh <language> <code_file> <input_file>

set -e

LANGUAGE="$1"
CODE_FILE="$2"
INPUT_FILE="$3"

# Read input
cat "$INPUT_FILE" > /tmp/input.json

# Execute based on language
case "$LANGUAGE" in
    python)
        python3 "$CODE_FILE" < /tmp/input.json
        ;;
    java)
        # Compile and run
        javac "$CODE_FILE"
        java -cp "$(dirname "$CODE_FILE")" Main < /tmp/input.json
        ;;
    cpp)
        # Compile and run
        g++ "$CODE_FILE" -o /tmp/solution
        /tmp/solution < /tmp/input.json
        ;;
    *)
        echo "ERROR: Unsupported language: $LANGUAGE"
        exit 1
        ;;
esac
