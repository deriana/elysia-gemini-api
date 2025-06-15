export function buildUniversalPrompt<T>(
  userPrompt: string,
  data: T[],
  label: string = "items"
) {
  const dataAsText = data
    .map((item, i) => {
      const lines = Object.entries(item as Record<string, any>)
        .map(([key, value]) => {
          const formattedValue = Array.isArray(value)
            ? value.join(", ")
            : String(value);
          return `${capitalize(key)}: ${formattedValue}`;
        })
        .join("\n");
      return `# ${label.slice(0, -1).toUpperCase()} ${i + 1}\n${lines}`;
    })
    .join("\n\n");

  return `
You are a helpful AI assistant.
Here is a list of ${label} you can reference:

${dataAsText}

Answer the following user question based **only on the ${label} above**:

User: ${userPrompt}
AI:
`.trim();
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
