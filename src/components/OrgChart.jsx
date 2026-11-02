import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ORG_LEVELS, ORG_TREE, flattenOrg } from '../data/orgData.js';
import { useInView } from '../hooks/useInView.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icon.jsx';

const rootNode = ORG_TREE;

function getDisplayName(node) {
  return node.level === 'director' ? node.name : node.role;
}

function getNodeMap(node = rootNode, map = new Map(), parents = new Map(), parent = null) {
  map.set(node.id, node);
  if (parent) parents.set(node.id, parent);
  (node.children ?? []).forEach((child) => getNodeMap(child, map, parents, node));
  return { map, parents };
}

/** Nodos visibles según el estado de colapso, en orden de lectura. */
function getVisibleNodes(node, collapsed, result = []) {
  result.push(node);
  if (!collapsed.has(node.id)) {
    (node.children ?? []).forEach((child) => getVisibleNodes(child, collapsed, result));
  }
  return result;
}

function getTrail(nodeId, parents, map) {
  const trail = [];
  let current = map.get(nodeId);
  let guard = 0;
  while (current && guard < 8) {
    trail.unshift(current);
    current = parents.get(current.id);
    guard += 1;
  }
  return trail;
}

function getBranchIds(node, highlighted = new Set()) {
  highlighted.add(node.id);
  (node.children ?? []).forEach((child) => getBranchIds(child, highlighted));
  return highlighted;
}

function Avatar({ node, size = 'md' }) {
  return (
    <span className={`org-avatar org-avatar--${node.level} org-avatar--${size}`} aria-hidden="true">
      {node.initials}
    </span>
  );
}

function OrgNode({
  node,
  isCollapsed,
  isSelected,
  isDimmed,
  onSelect,
  onHover,
  onFocus,
  tabIndex,
  buttonRef,
  variant = 'desktop',
  collapsible = true,
}) {
  const hasChildren = Boolean(node.children?.length);
  const canExpand = hasChildren && collapsible && node.level === 'coordinator';
  const level = ORG_LEVELS[node.level];
  const displayName = getDisplayName(node);

  return (
    <button
      type="button"
      className={`org-node org-node--${node.level} org-node--${variant} ${
        isSelected ? 'is-selected' : ''
      } ${isDimmed ? 'is-dimmed' : ''}`}
      ref={buttonRef}
      role="treeitem"
      aria-level={node.level === 'director' ? 1 : node.level === 'coordinator' ? 2 : 3}
      aria-selected={isSelected}
      aria-expanded={canExpand ? !isCollapsed : undefined}
      tabIndex={tabIndex}
      onClick={() => onSelect(node)}
      onPointerEnter={() => onHover(node.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => {
        onFocus(node.id);
        onHover(node.id);
      }}
      onBlur={() => onHover(null)}
      data-node-id={node.id}
    >
      <span className="org-node__glow" aria-hidden="true" />
      <Avatar node={node} size={variant === 'mobile' ? 'sm' : 'md'} />
      <span className="org-node__content">
        <span className="org-node__level">{level.label}</span>
        <strong>{displayName}</strong>
        {node.level === 'director' && <span className="org-node__role">{node.role}</span>}
        {node.level === 'coordinator' && (
          <span className="org-node__role">2 auxiliares a cargo</span>
        )}
      </span>
      {canExpand && (
        <span className={`org-node__toggle ${isCollapsed ? 'is-collapsed' : ''}`} aria-hidden="true">
          <Icon name="chevron-down" size={16} />
        </span>
      )}
      <span className="visually-hidden">Ver funciones del cargo.</span>
      <span className={`org-node__accent org-node__accent--${level.accent}`} aria-hidden="true" />
    </button>
  );
}

function OrgDetail({ node, trail }) {
  const level = ORG_LEVELS[node.level];
  return (
    <aside className="org-detail" aria-label={`Funciones de ${getDisplayName(node)}`} key={node.id}>
      <div className="org-detail__header">
        <Avatar node={node} size="lg" />
        <div>
          <p className="org-detail__eyebrow">
            {level.label} · Funciones del cargo
          </p>
          <h3>{getDisplayName(node)}</h3>
          {node.level === 'director' && <p className="org-detail__role">{node.role}</p>}
        </div>
      </div>

      {trail.length > 1 && (
        <div className="org-detail__trail" aria-label="Ruta en el organigrama">
          {trail.map((item, index) => (
            <span key={item.id}>
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === trail.length - 1
                ? getDisplayName(item)
                : item.level === 'director'
                  ? item.name
                  : item.role}
            </span>
          ))}
        </div>
      )}

      <ul className="org-detail__functions">
        {node.functions.map((func) => (
          <li key={func}>
            <span className="org-detail__check">
              <Icon name="check" size={12} strokeWidth={2.6} />
            </span>
            {func}
          </li>
        ))}
      </ul>

      <p className="org-detail__hint">
        <Icon name="grid" size={15} />
        Explora los nodos para conocer cada rol. Usa las flechas del teclado para navegar.
      </p>
    </aside>
  );
}

export default function OrgChart() {
  const [treeRef, inView] = useInView({ threshold: 0.08 });
  const nodeRefs = useRef(new Map());
  const [collapsed, setCollapsed] = useState(() => new Set());
  const [selectedId, setSelectedId] = useState(rootNode.id);
  const [hoveredId, setHoveredId] = useState(null);
  const [focusId, setFocusId] = useState(rootNode.id);
  const [paths, setPaths] = useState([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const { map, parents } = useMemo(() => getNodeMap(), []);
  const coordinatorIds = useMemo(
    () => rootNode.children.map((child) => child.id),
    [],
  );
  const totalNodes = useMemo(() => flattenOrg().length, []);
  const activeId = hoveredId ?? selectedId;
  const activeNode = map.get(activeId) ?? rootNode;

  const highlighted = useMemo(() => {
    if (activeId === rootNode.id) return new Set(map.keys());
    const trail = getTrail(activeId, parents, map);
    return getBranchIds(trail[trail.length - 1]);
  }, [activeId, map, parents]);

  const allCollapsed = coordinatorIds.every((id) => collapsed.has(id));
  const allExpanded = collapsed.size === 0;

  const registerNode = (id) => (element) => {
    if (element) nodeRefs.current.set(id, element);
    else nodeRefs.current.delete(id);
  };

  const toggleCollapsed = (id) => {
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelect = (node) => {
    setSelectedId(node.id);
    if (node.children?.length && node.level === 'coordinator') toggleCollapsed(node.id);
  };

  const expandAll = () => setCollapsed(new Set());
  const collapseAll = () => setCollapsed(new Set(coordinatorIds));

  // Recalcula los conectores SVG a partir de la geometría real de las tarjetas.
  const updateConnectors = useCallback(() => {
    const tree = treeRef.current;
    if (!tree) return;
    const treeRect = tree.getBoundingClientRect();
    const nextPaths = [];

    const visit = (parent) => {
      if (collapsed.has(parent.id)) return;
      const parentElement = nodeRefs.current.get(parent.id);
      if (!parentElement) return;
      const parentRect = parentElement.getBoundingClientRect();

      (parent.children ?? []).forEach((child) => {
        const childElement = nodeRefs.current.get(child.id);
        if (!childElement) return;
        const childRect = childElement.getBoundingClientRect();
        const parentX = parentRect.left - treeRect.left + parentRect.width / 2;
        const parentY = parentRect.bottom - treeRect.top;
        const childX = childRect.left - treeRect.left + childRect.width / 2;
        const childY = childRect.top - treeRect.top;
        const midY = parentY + (childY - parentY) / 2;

        nextPaths.push({
          id: `${parent.id}-${child.id}`,
          parentId: parent.id,
          childId: child.id,
          d: `M ${parentX.toFixed(1)} ${parentY.toFixed(1)} V ${midY.toFixed(
            1,
          )} H ${childX.toFixed(1)} V ${childY.toFixed(1)}`,
        });
        visit(child);
      });
    };

    visit(rootNode);

    setSvgSize((current) => {
      const next = { width: tree.scrollWidth, height: tree.scrollHeight };
      return current.width === next.width && current.height === next.height ? current : next;
    });
    setPaths((current) => {
      const currentKey = current.map((path) => path.d).join('|');
      const nextKey = nextPaths.map((path) => path.d).join('|');
      return currentKey === nextKey ? current : nextPaths;
    });
  }, [collapsed, treeRef]);

  useEffect(() => {
    const tree = treeRef.current;
    if (!tree) return undefined;

    updateConnectors();
    const frame = requestAnimationFrame(updateConnectors);
    const timeout = window.setTimeout(updateConnectors, 260);
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateConnectors) : null;

    observer?.observe(tree);
    nodeRefs.current.forEach((element) => observer?.observe(element));
    document.fonts?.ready.then(updateConnectors).catch(() => {});
    window.addEventListener('resize', updateConnectors);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      observer?.disconnect();
      window.removeEventListener('resize', updateConnectors);
    };
  }, [updateConnectors]);

  const handleTreeKeyDown = (event) => {
    const target = event.target.closest('[role="treeitem"]');
    if (!target) return;
    const visible = getVisibleNodes(rootNode, collapsed);
    const index = visible.findIndex((node) => node.id === target.dataset.nodeId);
    if (index < 0) return;
    const node = visible[index];

    const focusNode = (id) => {
      setFocusId(id);
      setSelectedId(id);
      requestAnimationFrame(() => {
        nodeRefs.current.get(id)?.focus();
      });
    };

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusNode(visible[Math.min(visible.length - 1, index + 1)].id);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusNode(visible[Math.max(0, index - 1)].id);
        break;
      case 'Home':
        event.preventDefault();
        focusNode(visible[0].id);
        break;
      case 'End':
        event.preventDefault();
        focusNode(visible[visible.length - 1].id);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (node.level === 'coordinator' && collapsed.has(node.id)) {
          toggleCollapsed(node.id);
        } else if (node.children?.length) {
          focusNode(node.children[0].id);
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (node.level === 'coordinator' && !collapsed.has(node.id)) {
          toggleCollapsed(node.id);
        } else if (parents.has(node.id)) {
          focusNode(parents.get(node.id).id);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setSelectedId(node.id);
        if (node.level === 'coordinator') toggleCollapsed(node.id);
        break;
      default:
        break;
    }
  };

  const renderDesktopBranches = () =>
    rootNode.children.map((coordinator) => {
      const isCollapsed = collapsed.has(coordinator.id);
      return (
        <div className="org-branch" key={coordinator.id}>
          <OrgNode
            node={coordinator}
            isCollapsed={isCollapsed}
            isSelected={selectedId === coordinator.id}
            isDimmed={!highlighted.has(coordinator.id)}
            onSelect={handleSelect}
            onHover={setHoveredId}
            onFocus={setSelectedId}
            tabIndex={focusId === coordinator.id ? 0 : -1}
            buttonRef={registerNode(coordinator.id)}
          />
          <div className={`org-children ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="org-children-inner">
              {coordinator.children.map((assistant) => (
                <OrgNode
                  key={assistant.id}
                  node={assistant}
                  isSelected={selectedId === assistant.id}
                  isDimmed={!highlighted.has(assistant.id)}
                  onSelect={handleSelect}
                  onHover={setHoveredId}
                  onFocus={setSelectedId}
                  tabIndex={focusId === assistant.id ? 0 : -1}
                  buttonRef={registerNode(assistant.id)}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>
      );
    });

  const renderMobileNode = (node, depth = 0) => {
    const hasChildren = Boolean(node.children?.length);
    const isCollapsed = collapsed.has(node.id);

    return (
      <div className={`org-mobile-branch org-mobile-branch--depth-${depth}`} key={node.id}>
        <OrgNode
          node={node}
          isCollapsed={isCollapsed}
          isSelected={selectedId === node.id}
          isDimmed={false}
          onSelect={handleSelect}
          onHover={setHoveredId}
          onFocus={setSelectedId}
          tabIndex={0}
          variant="mobile"
          collapsible={depth > 0}
        />
        {hasChildren && (
          <div className={`org-mobile-children ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="org-mobile-children-inner">
              {node.children.map((child) => renderMobileNode(child, depth + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const trail = getTrail(activeId, parents, map);

  return (
    <section className="section org" id="organigrama" aria-labelledby="org-title">
      <div className="org__aura" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="org-title"
          eyebrow="Estructura · Cómo nos organizamos"
          title={
            <>
              Un equipo pequeño.
              <br />
              Una estructura clara.
            </>
          }
          description="Cada rol tiene un propósito y un responsable. Explora el organigrama, descubre las funciones de cada cargo y entiende cómo se conecta el trabajo del taller."
          tone="light"
        />

        <Reveal className="org__toolbar" delay={100}>
          <div className="org__toolbar-meta">
            <span className="org__count">{totalNodes} cargos</span>
            <span className="org__count">4 coordinaciones</span>
            <span className="org__count org__count--accent">1 dirección</span>
          </div>
          <div className="org__toolbar-actions">
            <button
              className="btn btn--glass btn--sm"
              type="button"
              onClick={expandAll}
              disabled={allExpanded}
            >
              <Icon name="plus" size={15} />
              Expandir todo
            </button>
            <button
              className="btn btn--glass btn--sm"
              type="button"
              onClick={collapseAll}
              disabled={allCollapsed}
            >
              <Icon name="minus" size={15} />
              Contraer todo
            </button>
          </div>
        </Reveal>

        <div className="org__chart-shell">
          <div
            className="org-desktop"
            ref={treeRef}
            role="tree"
            aria-label="Organigrama de Mr. Fix-it"
            onKeyDown={handleTreeKeyDown}
          >
            <div className="org-root-row">
              <OrgNode
                node={rootNode}
                isCollapsed={false}
                isSelected={selectedId === rootNode.id}
                isDimmed={!highlighted.has(rootNode.id)}
                onSelect={handleSelect}
                onHover={setHoveredId}
                onFocus={setSelectedId}
                tabIndex={focusId === rootNode.id ? 0 : -1}
                buttonRef={registerNode(rootNode.id)}
                collapsible={false}
              />
            </div>

            <div className="org-coord-row">{renderDesktopBranches()}</div>

            <svg
              className={`org-connectors ${inView ? 'is-drawn' : ''}`}
              width={svgSize.width || '100%'}
              height={svgSize.height || '100%'}
              viewBox={`0 0 ${svgSize.width || 1} ${svgSize.height || 1}`}
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              {paths.map((path, index) => {
                const dimmed = !highlighted.has(path.parentId) || !highlighted.has(path.childId);
                return (
                  <path
                    key={path.id}
                    d={path.d}
                    pathLength="1"
                    className={`org-edge ${dimmed ? 'is-dimmed' : ''}`}
                    style={{ '--edge-index': index }}
                  />
                );
              })}
            </svg>
          </div>

          <div className="org-mobile" role="tree" aria-label="Organigrama de Mr. Fix-it, vista vertical">
            {renderMobileNode(rootNode)}
          </div>
        </div>

        <Reveal className="org__detail-wrap" delay={80}>
          <OrgDetail node={activeNode} trail={trail} />
        </Reveal>

        <p className="org__help">
          <Icon name="hand" size={17} />
          Toca o pasa el cursor sobre un nodo para resaltar su rama. En escritorio, un clic en una
          coordinación expande o contrae a sus auxiliares.
        </p>
      </div>
    </section>
  );
}
