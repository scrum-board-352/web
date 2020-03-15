function start_with {
  local string="$1"
  local prefix="$2"

  case "$string" in
      "$prefix"*) return 1;;
  esac

  return 0
}
