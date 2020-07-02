import { utils } from 'umi';
import { Program, ImportDeclaration, CallExpression, MemberExpression, ExportDefaultDeclaration } from '@babel/types';

const { t, traverse } = utils;

export default function isValidModel({ content }: { content: string }) {
  const { parser } = utils;
  const ast = parser.parse(content, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'classProperties',
      'dynamicImport',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'functionBind',
      'nullishCoalescingOperator',
      'objectRestSpread',
      'optionalChaining',
      'decorators-legacy',
    ],
  });

  let typesHasImported = false;
  let modelHasDefined = false;
  let modelInstanceHasCreated = false;
  let modelInstanceHasExported = false;
  const visitor: utils.traverse.Visitor = {
    Program: {
      enter(program: utils.traverse.NodePath<Program>) {
        program.traverse({
          ImportDeclaration(path: utils.traverse.NodePath<ImportDeclaration>) {
            const source = path.node.source.value;
            if (source === 'mobx-state-tree' || source === 'umi') {
              if (path.node.specifiers.some((it) => t.isImportSpecifier(it) && it.imported.name === 'types')) {
                typesHasImported = true;
              }
            }
          },
          MemberExpression(path: utils.traverse.NodePath<MemberExpression>) {
            if (t.isIdentifier(path.node.object) && t.isIdentifier(path.node.property)) {
              if (path.node.object.name === 'types' && path.node.property.name === 'model') {
                modelHasDefined = true;
              }
            }
          },
          CallExpression(path: utils.traverse.NodePath<CallExpression>) {
            if (
              t.isMemberExpression(path.node.callee) &&
              t.isIdentifier(path.node.callee.property) &&
              path.node.callee.property.name === 'create'
            ) {
              modelInstanceHasCreated = true;
            }
          },
        });
      },
      exit(program: utils.traverse.NodePath<Program>) {
        if (typesHasImported && modelHasDefined && modelInstanceHasCreated) {
          program.traverse({
            ExportDefaultDeclaration(path: utils.traverse.NodePath<ExportDefaultDeclaration>) {
              const declaration = path.node.declaration;
              if (t.isCallExpression(declaration) || t.isIdentifier(declaration)) {
                modelInstanceHasExported = true;
              }
            },
          });
        }
      },
    },
  };

  traverse.default(ast, visitor);

  return typesHasImported && modelHasDefined && modelInstanceHasCreated && modelInstanceHasExported;
}
