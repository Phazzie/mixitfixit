# Relationship Resolver Documentation

## Project Documentation

- [Project Guide](../projguid.md) - Main project overview and goals
- [Project Checklist](../project_checklist.md) - Project phases and task tracking

## Refactoring Documentation

- [Refactoring Documentation Summary](refactoring/README.md) - Overview of all refactoring documents with current status

### Current Documents ✅
- [Testing Improvement Plan](refactoring/testing_improvement_plan.md) - Comprehensive testing improvement checklist

### Partially Current Documents ⚠️
- [Phase 1 Implementation Plan](refactoring/phase1_implementation_plan.md) - Detailed day-by-day tasks for Phase 1
- [Refactoring Master Plan](refactoring/refactoring_master_plan.md) - Strategic plan for refactoring work

### Outdated Documents ❌
- [Original Refactoring Guide](refactoring/refactoring_guide.md) - Initial refactoring guidelines (outdated)
- [Side Refactor (Plan B)](refactoring/side_refactor.md) - Alternative refactoring approach (outdated)
- [SRP Refactoring Plan](refactoring/srp_refactoring_plan.md) - Initial analysis of SRP violations (outdated)

## Testing Documentation

- [Testing Guide](../testing_guide.md) - General testing guidelines and approaches
- [Verification Checklist](../verification_checklist.md) - Verification steps for features

## API Documentation

The JSDoc generated API documentation is available in this directory.

## Current Code Architecture

The project is now using a TypeScript-based architecture with strong SOLID principles for server-side code:

### Analysis Services
- Sentiment Analysis: A complete pipeline of specialized services for text sentiment analysis
- Text Analysis: Services for analyzing text metrics and complexity

### Key Implementation Patterns
- Interface-driven design with dependency injection
- Single Responsibility classes following SOLID principles
- Comprehensive unit testing with jest mocks