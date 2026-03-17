interface RoleStrategy {
  getRole(): string;
}

interface EnvironmentStrategy {
  getEnvironment(): string;
}

class AdminRoleStrategy implements RoleStrategy {
  getRole() {
    return 'admin';
  }
}

class GuestRoleStrategy implements RoleStrategy {
  getRole() {
    return 'guest';
  }
}

class StageStrategy implements EnvironmentStrategy {
  getEnvironment() {
    return 'stage';
  }
}

class ProdStrategy implements EnvironmentStrategy {
  getEnvironment() {
    return 'prod';
  }
}

interface LoginPageActions {
  fillUser(user: User): Promise<void>;
  selectRole(role: string): Promise<void>;
  selectEnvironment(env: string): Promise<void>;
  submit(): Promise<void>;
}

class LoginPage {
  constructor(private page: Page) {}

  async fillUser(user: User) {
    await this.page.fill('#user', user.name);
  }

  async selectRole(role: string) {
    await this.page.fill('#role', role);
  }

  async selectEnvironment(env: string) {
    await this.page.fill('#environment', env);
  }

  async submit() {
    await this.page.click('#login');
  }
}

class NewLoginPage {
  constructor(private page: Page) {}

  async fillUser(user: User) {
    await this.page.fill('#username-input', user.name);
  }

  async selectRole(role: string) {
    await this.page.selectOption('#role-dropdown', role);
  }

  async selectEnvironment(env: string) {
    await this.page.selectOption('#env-dropdown', env);
  }

  async submit() {
    await this.page.click('#submit-login');
  }
}

class LoginPageFactory {
  static create(page: Page, isNew: boolean): LoginPageActions {
    if (isNew) {
      return new NewLoginPage(page);
    }

    return new LoginPage(page);
  }
}


class LoginFlow {
  constructor(
    private page: LoginPageActions,
    private roleStrategy: RoleStrategy,
    private environmentStrategy: EnvironmentStrategy
  ) {}

  async execute(user: User) {
    await this.page.fillUser(user);

    await this.page.selectRole(
      this.roleStrategy.getRole()
    );

    await this.page.selectEnvironment(
      this.environmentStrategy.getEnvironment()
    );

    await this.page.submit();
  }
}


test('login test', async ({ page }) => {
  const isNewLoginFlow = true;

  const loginPage = LoginPageFactory.create(page, isNewLoginFlow);

  const roleStrategy = new AdminRoleStrategy();
  const envStrategy = new StageStrategy();

  const flow = new LoginFlow(
    loginPage,
    roleStrategy,
    envStrategy
  );

  const user = new User('John');

  await flow.execute(user);
});