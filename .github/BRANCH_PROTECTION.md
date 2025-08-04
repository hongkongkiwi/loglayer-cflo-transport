# Branch Protection Configuration

This document outlines the recommended branch protection rules for this repository. These rules should be configured in the GitHub repository settings under "Settings > Branches".

## Main Branch Protection Rules

Configure the following rules for the `main` branch:

### Required Status Checks
✅ **Require status checks to pass before merging**
- ✅ Require branches to be up to date before merging

**Required status checks:**
- `lint` (from CI workflow)
- `typecheck` (from CI workflow) 
- `test (Node 18.x)` (from CI workflow)
- `test (Node 20.x)` (from CI workflow)
- `test (Node 22.x)` (from CI workflow)
- `build` (from CI workflow)
- `all-checks` (from CI workflow)

### Pull Request Requirements
✅ **Require a pull request before merging**
- ✅ Require approvals: **1**
- ✅ Dismiss stale reviews when new commits are pushed
- ✅ Require review from code owners (if CODEOWNERS file exists)

### Additional Restrictions
✅ **Restrict pushes that create files larger than 100 MB**
✅ **Require signed commits**
✅ **Include administrators** (enforce rules for repository administrators)
✅ **Allow force pushes: Everyone** (disabled for security)
✅ **Allow deletions** (disabled for security)

## Develop Branch Protection Rules (if used)

Configure similar rules for the `develop` branch with slightly relaxed requirements:

### Required Status Checks
✅ **Require status checks to pass before merging**
- ✅ Require branches to be up to date before merging

**Required status checks:**
- `lint` (from CI workflow)
- `typecheck` (from CI workflow)
- `test (Node 20.x)` (from CI workflow) - minimum one Node version
- `build` (from CI workflow)

### Pull Request Requirements
✅ **Require a pull request before merging**
- ✅ Require approvals: **1**
- ✅ Dismiss stale reviews when new commits are pushed

## Dependabot Auto-merge Configuration

To enable automatic merging for Dependabot PRs while maintaining security:

1. **Enable "Allow auto-merge"** in repository settings
2. **Create a Personal Access Token** with `repo` scope for Dependabot workflows
3. **Add the token as a repository secret** named `GITHUB_TOKEN` (or use the default one)

### Auto-merge Criteria (configured in dependabot-auto-merge.yml)
- ✅ All required status checks must pass
- ✅ Only security updates and patch/minor version updates
- ✅ Created by `dependabot[bot]`
- ✅ Title matches pattern: `chore(deps):`

## Setting Up Branch Protection

1. Go to repository **Settings > Branches**
2. Click **Add rule** or **Edit** existing rule
3. Set **Branch name pattern**: `main`
4. Configure the settings as outlined above
5. Click **Create** or **Save changes**

Repeat for `develop` branch if using Git Flow.

## Required Repository Settings

Ensure these repository settings are also configured:

### General Settings
- ✅ **Automatically delete head branches** (after PR merge)
- ✅ **Always suggest updating pull request branches**

### Actions Settings
- ✅ **Allow GitHub Actions to create and approve pull requests**
- ✅ **Allow GitHub Actions to approve pull requests**

### Security Settings
- ✅ **Enable Dependabot alerts**
- ✅ **Enable Dependabot security updates**
- ✅ **Enable Dependabot version updates**

This configuration ensures:
- 🛡️ **Security**: All code is reviewed and tested before merging
- 🤖 **Automation**: Dependabot can auto-merge safe updates
- 🚫 **Quality**: No code reaches main without passing all checks
- 📝 **Transparency**: Clear audit trail of all changes