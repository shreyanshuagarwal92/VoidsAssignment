class EnvVariablesVerifier {
  private requiredVariables: string[];

  constructor(requiredVariables: string[]) {
    this.requiredVariables = requiredVariables;
  }

  public verify(): void {
    const missingVariables = this.requiredVariables.filter(
      (variable) => !process.env[variable]
    );

    if (missingVariables.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVariables.join(", ")}`
      );
    }
  }
}

export { EnvVariablesVerifier };
