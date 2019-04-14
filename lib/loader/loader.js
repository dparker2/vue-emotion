import codegen from './codegen'
import { parseUntil } from 'character-parser'

const nextBlock = (src, start) => {
    const remaining = src.slice(start)
    const section = parseUntil(remaining, '}', {start: remaining.indexOf('{')+1})
    return start+section.end+1
}

export default function (source, map) {
    const src = source.trim();
    const blocks = [];
    let end;
    for (let start = 0; end !== src.length; start = end) {
      try {
        end = nextBlock(src, start)
      } catch (e) { break; }
      blocks.push(src.slice(start, end))
    }

    this.callback(
        null,
        codegen(blocks),
        map
    )
}
