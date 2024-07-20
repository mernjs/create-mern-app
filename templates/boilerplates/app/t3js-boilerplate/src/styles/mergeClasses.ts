export function mergeClasses(
    incomingClasses: string | undefined,
    defaultClasses: string
) {
    const incClasses = incomingClasses?.split(" ") ?? [];
    const defaultClassArray = defaultClasses.split(" ");
    return Array.from(new Set([...incClasses, ...defaultClassArray])).join(" ");
}
