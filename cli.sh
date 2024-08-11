# default로 .env 설정
env_file=".env"

for arg in "$@"; do
    case $arg in
        --env=* | --e=*) 
            env_file="${arg#*=}" 
            ;;
        *)
            ;;
    esac
done

# 파일 존재 여부 확인
if [ -f "$env_file" ]; then
    source "$env_file"
else
    echo "Error: $env_file does not exist."
    exit 1
fi

echo "== 🛠️ Set ENV $env_file\n"

func_help()
{
    echo Usage:
    echo "  ./cli.sh [command]"
    echo
    echo Available Commands:
    echo "  clean              Clean Batch Posting Repost (PATH: $BATCH_POSTING_REPORT_PATH)"
    echo "  sort               Sort Batch Posting Repost by block number (PATH: $BATCH_POSTING_REPORT_PATH)"
    echo
    echo Golobal Options:
    echo "  --env=, e=         Set env Path (DEFAULT .env)"
}

case "$1" in
    "clean")
        echo "[]" > $BATCH_POSTING_REPORT_PATH
        echo "{}" > $BATCH_POSTING_REPORT_CALLDATA_PATH
        ;;
    "sort")
        jq '. | sort_by(.blockNumber)' $BATCH_POSTING_REPORT_PATH > temp.json && mv temp.json $BATCH_POSTING_REPORT_PATH
        ;;
    "collect")
        ts-node scripts/CollectReport.ts
        ;;
    "help" | "h")
        func_help
        ;;
    *)
    func_help
    ;;
esac